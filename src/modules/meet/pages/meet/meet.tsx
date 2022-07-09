import { memo, useEffect, useRef, useState } from 'react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { Navigation } from 'core/components/navigation';
import { UserControl } from 'core/components/user-control';
import { theme } from 'core/theme';
import { useNavigate } from 'react-router-dom';
import { useUserMedia } from 'modules/user/hooks';
import { socket } from 'core/utils/socket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'core/store/types';
import { CallEndRounded, Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';
import { VideoCard } from 'core/components/video-card';
import { setMeetStateAction } from 'modules/meet/store';
import { setMediaAction } from 'modules/user/store';

const Meet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, media } = useSelector((state: RootState) => state.user);
  const { meet } = useSelector((state: RootState) => state.meet);

  const [stream, setStream] = useState<MediaStream>();
  const [friendMedia, setFriendMedia] = useState<MediaStreamConstraints>({ audio: true, video: true });
  const [callingState, setCallingState] = useState<RTCIceConnectionState>('new');

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const friendVideo = useRef<HTMLVideoElement | null>(null);
  const friendStream = useRef<MediaStream | null>(null);

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
    dispatch(setMediaAction({ audio: true, video: true }));
    dispatch(setMeetStateAction({ meetState: 'new' }));

    return () => {
      socket.removeListener('server:media_state_change');
      socket.removeListener('server:meet_accept_call');
      socket.removeListener('server:meet_offer');
      socket.removeListener('server:meet_answer');
      socket.removeListener('server:meet_candidate');
      socket.removeListener('server:meet_end_call');
    };
  }, []);

  useEffect(() => {
    if (friendVideo.current && friendStream.current) {
      if (friendMedia.video) {
        if (friendStream.current) {
          friendVideo.current.srcObject = friendStream.current;
        }
      } else {
        friendVideo.current.srcObject = null;
      }
    }
  }, [stream, friendMedia]);

  useEffect(() => {
    if (stream) {
      // NOTE: getSenders -> [audio, video]
      if (peerConnection.current) {
        console.log('senders', peerConnection.current.getSenders());

        // TODO: Регировать на сигналинг и обновлять значения
        // setFriendConstraints({
        //   video: peerConnection.current.getSenders()[1].track?.enabled,
        //   audio: peerConnection.current.getSenders()[0].track?.enabled,
        // });
      }

      if (media.audio) {
        if (peerConnection.current) {
          peerConnection.current.getSenders()[0].replaceTrack(
            stream
              .getAudioTracks()
              .slice()
              .map((track) => {
                track.enabled = true;
                return track;
              })[0] || null
          );
        }
      } else {
        if (peerConnection.current) {
          peerConnection.current.getSenders()[0].replaceTrack(
            stream
              .getAudioTracks()
              .slice()
              .map((track) => {
                track.enabled = false;
                return track;
              })[0] || null
          );
        }
      }

      if (media.video) {
        if (peerConnection.current) {
          peerConnection.current.getSenders()[1].replaceTrack(
            stream
              .getVideoTracks()
              .slice()
              .map((track) => {
                track.enabled = true;
                return track;
              })[0] || null
          );
        }
      } else {
        if (peerConnection.current) {
          peerConnection.current.getSenders()[1].replaceTrack(
            stream
              .getVideoTracks()
              .slice()
              .map((track) => {
                track.enabled = false;
                return track;
              })[0] || null
          );
        }
      }
    }
  }, [stream, media]);

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

      socket.on('server:media_state_change', (payload: { media: { audio: boolean; video: boolean } }) => {
        setFriendMedia(payload.media);
      });

      socket.on('server:meet_accept_call', () => {
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

      socket.on(
        'server:meet_offer',
        (payload: { userFromCall: string; userToCall: string }, offer: RTCSessionDescriptionInit) => {
          // console.log('LOGS: Server meet offer', user_id, friend_id, offer);
          handleOffer(payload.userFromCall, payload.userToCall, offer);
        }
      );

      socket.on('server:meet_answer', (user_id: string, friend_id: string, answer: RTCSessionDescriptionInit) => {
        // console.log('LOGS: Server meet answer', user_id, friend_id, answer);
        handleAnswer(user_id, friend_id, answer);
      });

      socket.on('server:meet_candidate', (user_id: string, friend_id: string, candidate: RTCIceCandidate) => {
        // console.log('LOGS: Server meet candidate', user_id, friend_id, candidate);
        handleCandidate(candidate);
      });

      socket.on('server:meet_end_call', () => {
        if (peerConnection.current) {
          dispatch(setMeetStateAction({ meetState: 'disconnected' }));
          dispatch(setMediaAction({ audio: true, video: true }));
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
          dispatch(setMeetStateAction({ meetState: peerConnection.current.iceConnectionState }));
        }
      };

      // NOTE: Обновление обработчика события track
      peerConnection.current.ontrack = (event) => {
        console.log('LOGS: ontrack event', event);
        console.log('EVENT_STREAMS', event.streams[0].getVideoTracks(), event.streams[0].getAudioTracks());

        if (friendVideo.current) {
          friendStream.current = event.streams[0];
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

    socket.emit('client:meet_end_call', friendId);
    dispatch(setMeetStateAction({ meetState: 'new' }));
    navigate('/');
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
              overflow: 'hidden',
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

            {/* NOTE: Тень для кнопок */}
            <Box
              sx={{
                width: '100%',
                height: '64px',
                position: 'absolute',
                bottom: '0',
                left: '0',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%)',
                zIndex: 2,
              }}
            />

            {/* NOTE: Видео пользователя в мини окне */}

            <VideoCard
              ref={userVideo}
              sx={{
                display: media.video ? 'grid' : 'none',
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

            {/* NOTE: Изображение пользователя */}
            {(callingState !== 'connected' || !friendMedia.video) && (
              <Avatar
                sx={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  backgroundColor: meet.user?.color ? meet.user.color : meet.user?.default_color,
                  boxShadow: '0 0 16px 4px rgb(0 0 0 / 25%)',
                }}
                src={meet.user?.image ? meet.user.image : ''}
              />
            )}

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

            {stream && callingState === 'connected' && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, max-content)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: '8px',
                  padding: '16px 0',
                  zIndex: 2,
                }}
              >
                {/* NOTE: Кнопка вкл/выкл микрофон */}
                <IconButton
                  sx={{
                    // display: 'none',
                    minWidth: '32px',
                    minHeight: '32px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                  }}
                >
                  {friendMedia.audio ? (
                    <Mic sx={{ color: theme.palette.common.white, width: '16px', height: '16px' }} />
                  ) : (
                    <MicOff sx={{ color: theme.palette.grey[700] }} />
                  )}
                </IconButton>

                {/* NOTE: Кнопка закончить вызов */}
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    minWidth: '32px',
                    minHeight: '32px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                  }}
                  onClick={() => {
                    endCall();
                  }}
                >
                  <CallEndRounded sx={{ color: theme.palette.common.white, width: '16px', height: '16px' }} />
                </Button>

                {/* NOTE: Кнопка вкл/выкл камеру */}
                <IconButton
                  // onClick={() => {
                  //   setConstraints({ ...constraints, video: !constraints.video });
                  // }}
                  sx={{
                    // display: 'none',
                    minWidth: '32px',
                    minHeight: '32px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                  }}
                >
                  {friendMedia.video ? (
                    <Videocam sx={{ color: theme.palette.common.white, width: '16px', height: '16px' }} />
                  ) : (
                    <VideocamOff sx={{ color: theme.palette.grey[700] }} />
                  )}
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const MeetMemoized = memo(Meet);
