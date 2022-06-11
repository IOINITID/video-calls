import { memo, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { Navigation } from 'core/components/navigation';
import { UserControl } from 'core/components/user-control';
import { theme } from 'core/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserMedia } from 'modules/user/hooks';
import { socket } from 'core/utils/socket';
import { useSelector } from 'react-redux';
import { RootState } from 'core/store/types';

const Meet = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { stream, state, getUserMedia, stopUserMedia } = useUserMedia();
  const { user } = useSelector((state: RootState) => state.user);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const friendVideo = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    socket.on('server:meet_offer', (offer: RTCSessionDescriptionInit) => {
      handleOffer(offer);
      console.log('LOGS: Server meet offer', offer);
    });

    socket.on('server:meet_answer', (answer: RTCSessionDescriptionInit) => {
      handleAnswer(answer);
      console.log('LOGS: Server meet answer', answer);
    });

    socket.on('server:meet_candidate', (candidate: RTCIceCandidate) => {
      handleCandidate(candidate);
      console.log('LOGS: Server meet candidate', candidate);
    });

    socket.on('server:meet_start_call', () => {
      if (peerConnection.current) {
        console.log('Соединение уже установленно.');
        return;
      }

      startCall();
      console.log('LOGS: Server start call');
    });

    socket.on('server:meet_end_call', () => {
      if (peerConnection.current) {
        endCall();
        console.log('LOGS: Server end call');
      }
    });
  }, []);

  useEffect(() => {
    if (stream && state === 'fulfilled' && userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [state, stream]);

  // NOTE: Создание peer соединения
  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection();
    peerConnection.current.addEventListener('icecandidate', (event) => {
      const candidate: Record<string, unknown> = {
        candidate: null,
        sdpMid: null,
        sdpMLineIndex: null,
      };

      if (event.candidate) {
        candidate.candidate = event.candidate.candidate;
        candidate.sdpMid = event.candidate.sdpMid;
        candidate.sdpMLineIndex = event.candidate.sdpMLineIndex;
      }

      socket.emit('client:meet_candidate', 'ef0eca5a-5304-4937-8fa6-03a905f99b92', candidate);
      console.log('LOGS: Client meet candidate');
    });
    peerConnection.current.addEventListener('track', (event) => {
      if (friendVideo.current) {
        friendVideo.current.srcObject = event.streams[0];
      }
    });
    if (stream) {
      stream.getTracks().forEach((track) => {
        if (peerConnection.current) {
          peerConnection.current.addTrack(track, stream);
        }
      });
    }
  };

  // NOTE: Начать звонок
  const startCall = async () => {
    // TODO: Проверить необходимость использования await
    await createPeerConnection();

    if (peerConnection.current) {
      const offer = await peerConnection.current.createOffer();

      socket.emit('client:meet_offer', 'ef0eca5a-5304-4937-8fa6-03a905f99b92', offer.sdp);
      console.log('LOGS: Client meet offer');

      await peerConnection.current.setLocalDescription(offer);
    }
  };

  // NOTE: Обработка предложения вызова
  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    // TODO: Проверить необходимость проверки на наличие peer соединения
    // if (peerConnection.current) {
    //   console.log('Соединение уже установлено.');
    //   return;
    // }

    // TODO: Проверить необходимость использования await
    await createPeerConnection();

    if (peerConnection.current) {
      await peerConnection.current.setRemoteDescription(offer);

      const answer = await peerConnection.current.createAnswer();

      socket.emit('client:meet_answer', 'ef0eca5a-5304-4937-8fa6-03a905f99b92', answer.sdp);
      console.log('LOGS: Client meet answer');

      await peerConnection.current.setLocalDescription(answer);
    }
  };

  // NOTE: Обработка ответа вызова
  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    if (!peerConnection.current) {
      console.error('Peer соединение не установлено.');
      return;
    }

    await peerConnection.current.setRemoteDescription(answer);
  };

  // NOTE: Обработка получения кандидата для соединения
  const handleCandidate = async (candidate: RTCIceCandidate) => {
    if (!peerConnection.current) {
      console.error('Соединение не установлено.');
      return;
    }

    if (!candidate.candidate) {
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
            gridTemplateRows: 'repeat(2, 1fr)',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: '32px',
            width: '100%',
            padding: '32px',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Box
              component="video"
              sx={{
                width: '100%',
                height: 'calc((100vh - 168px) / 2)',
                backgroundColor: theme.palette.grey['700'],
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              ref={userVideo}
              muted
              autoPlay
            />
            {!stream && (
              <Button
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
                onClick={() => {
                  getUserMedia({ video: true, audio: true });
                  socket.emit('client:meet_start_call', 'ef0eca5a-5304-4937-8fa6-03a905f99b92');
                }}
              >
                Начать вызов
              </Button>
            )}
            {stream && (
              <Button
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
                onClick={() => {
                  stopUserMedia();
                  socket.emit('client:meet_end_call', 'ef0eca5a-5304-4937-8fa6-03a905f99b92');
                }}
              >
                Закончить вызов
              </Button>
            )}
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box
              component="video"
              sx={{
                width: '100%',
                height: 'calc((100vh - 168px) / 2)',
                backgroundColor: theme.palette.grey['700'],
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              ref={friendVideo}
              muted
              autoPlay
            />

            <Button
              sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}
              onClick={() => {
                socket.emit('client:meet_answer', 'ef0eca5a-5304-4937-8fa6-03a905f99b92');
              }}
            >
              Ответить
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const MeetMemoized = memo(Meet);
