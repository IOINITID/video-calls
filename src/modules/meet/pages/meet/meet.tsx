import { memo, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { Navigation } from 'core/components/navigation';
import { UserControl } from 'core/components/user-control';
import { theme } from 'core/theme';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useUserMedia } from 'modules/user/hooks';
import { socket } from 'core/utils/socket';
import { useSelector } from 'react-redux';
import { RootState } from 'core/store/types';
import { CallEndRounded } from '@mui/icons-material';
import { VideoCard } from 'core/components/video-card';

const Meet = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { user } = useSelector((state: RootState) => state.user);
  const { meet } = useSelector((state: RootState) => state.meet);

  const [stream, setStream] = useState<MediaStream>();
  const [callingState, setCallingState] = useState<RTCIceConnectionState>('new');

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const friendVideo = useRef<HTMLVideoElement | null>(null);

  // TODO: Добавить store для пользователя которому звонят, с его фоном и изображением и для получения id

  // TODO: Переименовать на userToCall
  const friendId = meet.user?.id ? meet.user.id : '';
  const initiator = meet.isInitiator;

  // NOTE: Получение медиапотока с устройств
  const getStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    setStream(stream);

    return { stream };
  };

  // NOTE: Получение медиапотока с устройств
  useEffect(() => {
    console.log('LOGS: Получение медиапотока с устройств.');
    console.log(`LOGS: Пользователь инициатор: ${initiator}`);

    getStream();
  }, []);

  // NOTE: Когда медиапоток и ID пользователя готовы и пользователь является инициатором вызова, отправка события для звонка пользователю
  useEffect(() => {
    if (stream) {
      console.log('LOGS: Когда медиапоток и ID пользователя готовы.');

      // NOTE: Добавление медиапотока в видео пользователя который звонит
      if (userVideo.current) {
        console.log('LOGS: Добавление медиапотока в видео пользователя который звонит.');
        userVideo.current.srcObject = stream;
      }

      // NOTE: Отправка события начала вызова
      if (user?.id && friendId) {
        if (initiator) {
          console.log('LOGS: Отправка события начала вызова.');
          socket.emit('client:meet_start_call', { userFromCall: user.id, userToCall: friendId });
        }

        if (!initiator) {
          console.log('LOGS: Отправка события принятия вызова.');
          socket.emit('client:meet_accept_call', { userFromCall: user.id, userToCall: friendId });
        }
      }

      socket.once('server:meet_accept_call', () => {
        if (peerConnection.current) {
          console.log('LOGS: Соединение уже установленно.');
          return;
        }

        if (!initiator) {
          console.log('LOGS: Пользователь инициатор вызова.');
          return;
        }

        // NOTE: Начало установки соединения между пользователями
        console.log('LOGS: Начало установки соединения между пользователями.');
        startConnection();
      });

      socket.once(
        'server:meet_offer',
        (payload: { userFromCall: string; userToCall: string }, offer: RTCSessionDescriptionInit) => {
          // console.log('LOGS: Server meet offer', user_id, friend_id, offer);
          handleOffer(payload.userFromCall, payload.userToCall, offer);
        }
      );

      socket.once('server:meet_answer', (user_id: string, friend_id: string, answer: RTCSessionDescriptionInit) => {
        // console.log('LOGS: Server meet answer', user_id, friend_id, answer);
        handleAnswer(user_id, friend_id, answer);
      });

      socket.once('server:meet_candidate', (user_id: string, friend_id: string, candidate: RTCIceCandidate) => {
        // console.log('LOGS: Server meet candidate', user_id, friend_id, candidate);
        handleCandidate(candidate);
      });

      socket.once('server:meet_end_call', () => {
        if (peerConnection.current) {
          endCall();
          navigate('/');
          // console.log('LOGS: Server end call');
        }
      });
    }

    return () => {
      // NOTE: Отключение медиапотока при размонтировании компонента
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      }
    };
  }, [stream, user, meet]);

  // NOTE: Создание peer соединения
  const createPeerConnection = () => {
    if (stream) {
      // NOTE: Создание peer соединения
      peerConnection.current = new RTCPeerConnection({
        iceServers: [
          {
            urls: 'stun:openrelay.metered.ca:80',
          },
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          },
          {
            urls: 'turn:openrelay.metered.ca:443',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          },
          {
            urls: 'turn:openrelay.metered.ca:443?transport=tcp',
            username: 'openrelayproject',
            credential: 'openrelayproject',
          },
        ],
      });

      // NOTE: Добавление обработчика события icecandidate
      peerConnection.current.onicecandidate = (event) => {
        socket.emit('client:meet_candidate', user?.id, friendId, event.candidate);
        console.log('LOGS: icecandidate event', event);
      };

      // NOTE: Добавление обработчика события onconnectionstatechange
      peerConnection.current.onconnectionstatechange = () => {
        if (peerConnection.current) {
          setCallingState(peerConnection.current.iceConnectionState);
        }
      };

      // NOTE: Обновление обработчика события track
      peerConnection.current.ontrack = (event) => {
        console.log('LOGS: ontrack event', event);
        if (friendVideo.current) {
          friendVideo.current.srcObject = event.streams[0];
        }
      };

      // NOTE: Добавление медиапотока к peer соединению
      console.log('LOGS: stream', stream);
      stream.getTracks().forEach((track) => {
        console.log('LOGS: track', track);
        peerConnection.current?.addTrack(track, stream);
      });

      console.log('LOGS: createPeerConnection', peerConnection.current);
    }
  };

  // NOTE: Начинает вызов
  const startConnection = async () => {
    try {
      // NOTE: Создание peer соединения
      console.log('LOGS: Создание peer соединения.');
      createPeerConnection();

      if (peerConnection.current) {
        // NOTE: Создание предложения для peer соединения
        console.log('LOGS: Создание предложения для peer соединения.');
        const offer = await peerConnection.current.createOffer();

        // NOTE: Отправка предложения другому пользователю
        if (user?.id && friendId) {
          console.log('LOGS: Отправка предложения другому пользователю.');
          socket.emit('client:meet_offer', { userFromCall: user.id, userToCall: friendId }, offer);
        }

        // NOTE: Установка предложения пользователю локально для peer соединения
        console.log('LOGS: Установка предложения пользователю локально для peer соединения.');
        await peerConnection.current.setLocalDescription(offer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // NOTE: Обработка предложения вызова
  const handleOffer = async (user_id: string, friend_id: string, offer: RTCSessionDescriptionInit) => {
    try {
      // NOTE: Установка peer соединения для обработки предложения
      console.log('LOGS: Установка peer соединения для обработки предложения.');
      createPeerConnection();

      if (peerConnection.current) {
        console.log('LOGS: Установка удаленного предложения peer соединения.');
        await peerConnection.current.setRemoteDescription(offer);

        console.log('LOGS: Создание ответа peer соединения.');
        const answer = await peerConnection.current.createAnswer();

        console.log('LOGS: Событие отправки ответа peer соединения.');
        socket.emit('client:meet_answer', friend_id, user_id, answer);

        console.log('LOGS: Установка локального ответа peer соединения.');
        await peerConnection.current.setLocalDescription(answer);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // NOTE: Обработка ответа вызова
  const handleAnswer = async (user_id: string, friend_id: string, answer: RTCSessionDescriptionInit) => {
    if (!peerConnection.current) {
      console.error('Peer соединение не установлено.');
      return;
    }

    await peerConnection.current.setRemoteDescription(answer);
  };

  // NOTE: Обработка получения кандидата для соединения
  const handleCandidate = async (candidate: RTCIceCandidate) => {
    // if (!candidate) {
    //   console.log('LOGS: Кандидат не найден.');
    //   return;
    // }

    if (!peerConnection.current) {
      console.error('Соединение не установлено.');
      return;
    }

    console.log('LOGS: Кандидат', candidate);

    if (!candidate || !candidate.candidate) {
      await peerConnection.current.addIceCandidate(undefined);
    } else {
      await peerConnection.current.addIceCandidate(candidate);
    }
  };

  // NOTE: Закончить звонок
  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '72px 376px 1fr',
        height: '100%',
        backgroundColor: theme.palette.common.white,
      }}
    >
      {/* Навигация */}
      <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
        <Navigation />
      </Box>
      {/* Личные сообщения*/}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '72px max-content 1fr 64px',
          backgroundColor: theme.palette.grey[400],
          overflow: 'hidden',
        }}
      >
        {/* Заголовок  */}
        <Box sx={{ padding: '24px 20px', borderBottom: `1px solid ${theme.palette.grey[600]}` }}>
          <Typography variant="h6">Личные сообщения</Typography>
        </Box>
        {/* Друзья */}
        <Box sx={{ padding: '16px' }}>
          <Button fullWidth variant="contained" onClick={() => navigate('/friends')}>
            Друзья
          </Button>
        </Box>
        {/* Список сообщений от пользователей */}
        <Box
          sx={{
            margin: '28px 4px',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'none',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: theme.palette.grey[300],
              border: `1px solid ${theme.palette.grey[500]}`,
              borderRadius: '8px',
            },
          }}
        >
          <Box sx={{ display: 'grid', rowGap: '12px', padding: '0 4px' }}>
            {/* {usersMessages?.map((value: any) => {
              return (
                <User
                  key={value.userData.id}
                  id={value.userData.id}
                  name={value.userData.name}
                  status={value.userData.status}
                  email={value.userData.email}
                />
              );
            })} */}
          </Box>
        </Box>
        {/* Управление пользователем */}
        <UserControl />
      </Box>
      {/* Блок друзья */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '72px 1fr',
          backgroundColor: theme.palette.grey[500],
          overflow: 'hidden',
        }}
      >
        {/* Навигация по разделу друзья */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, max-content)',
            columnGap: '24px',
            padding: '16px 24px',
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Встреча</Typography>
        </Box>
        {/* Содержимое вкладки */}
        <Box
          sx={{
            display: 'grid',
            width: '100%',
            height: '100%',
            padding: '16px',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            gridTemplateColumns: '1fr',
          }}
        >
          {/* NOTE: Контейнер видео пользователя которому звонят */}
          <Box
            sx={{
              position: 'relative',
              width: '640px',
              height: '360px',
              alignSelf: 'center',
              justifySelf: 'center',

              '&:hover .call-end-button': {
                display: 'grid',
              },
            }}
          >
            {/* NOTE: Видео пользователя которому звонят */}
            <VideoCard
              sx={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: meet.user?.color ? meet.user.color : theme.palette.grey['700'],
                objectFit: 'cover',
                borderRadius: '8px',
                zIndex: 1,
              }}
              ref={friendVideo}
              autoPlay
            />

            {/* NOTE: Видео пользователя в мини окне */}
            <VideoCard
              ref={userVideo}
              sx={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '128px',
                height: '72px',
                backgroundColor: theme.palette.grey['700'],
                objectFit: 'cover',
                borderRadius: '8px',
                zIndex: 2,
              }}
              autoPlay
              muted
            />

            {callingState === 'new' ? (
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  bottom: '88px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  color: '#ffffff',
                }}
              >
                Звоним пользователю {meet.user?.name ? meet.user.name : 'Неизвестный пользователь'}...
              </Typography>
            ) : callingState === 'checking' ? (
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  bottom: '88px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  color: '#ffffff',
                }}
              >
                Подключение...
              </Typography>
            ) : null}

            {/* NOTE: Кнопка закончить вызов */}
            {stream && (
              <Button
                className="call-end-button"
                variant="contained"
                color="error"
                sx={{
                  display: 'none',
                  minWidth: '48px',
                  minHeight: '48px',
                  width: '48px',
                  height: '48px',
                  position: 'absolute',
                  bottom: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 2,
                  borderRadius: '50%',
                  padding: '0',
                }}
                onClick={() => {
                  socket.emit('client:meet_end_call', friendId);
                  navigate('/');
                }}
              >
                <CallEndRounded sx={{ width: '24px', height: '24px' }} />
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const MeetMemoized = memo(Meet);
