/* eslint-disable jsx-a11y/media-has-caption */
import { memo, useEffect, useRef, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Button } from '../../../../core/components/button';
import { theme } from '../../../../core/theme';
import { socket } from '../../../../core/containers/app-container/app-container';
import { useSelector } from 'react-redux';
import { userFriendsSelector, userIdSelector } from '../../../user/store/selectors';
import Peer, { Instance, SignalData } from 'simple-peer';
import { User } from '../../../../core/components/user';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../../../../core/components/navigation';

const Channels = () => {
  const navigate = useNavigate();

  const userId = useSelector(userIdSelector);
  const friends = useSelector(userFriendsSelector);

  const [stream, setStream] = useState<MediaStream>(); // Мой стрим
  const [signal, setSignal] = useState<SignalData | string>(''); // Сигнал от пользователя, который звонит
  const [userIdThatCall, setUserIdThatCall] = useState(''); // Id пользователя, который звонит
  const [isCall, setIsCall] = useState(false); // Звоню я или нет
  const [isIncomingCall, setIsIncomingCall] = useState(false); // Звонят мне или нет
  const [isCallAccepted, setIsCallAccepted] = useState(false); // Вызов принят или нет
  const [isCallCanceled, setIsCallCanceled] = useState(false); // Вызов отменен или нет

  const myVideoStream = useRef<HTMLVideoElement | null>(null); // Мое видео
  const userVideoStream = useRef<HTMLVideoElement | null>(null); // Видео пользователя с кем звонок

  const connectionRef = useRef<Instance | null>(null); // Ссылка соединения

  const getMediaStream = async ({ video = true, audio = true }: { video?: boolean; audio?: boolean } = {}) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video, audio });

      setStream(stream);

      if (myVideoStream.current) {
        myVideoStream.current.srcObject = stream;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // TODO: Добавить включение видео и аудио
    getMediaStream();

    socket.on('on-call', (signal, user) => {
      setSignal(signal);
      setUserIdThatCall(user);

      setIsIncomingCall(true);
    });

    socket.on('on-call-end', () => {
      // TODO: Доделать логику отображения при принятии вызова и его отмене
      setIsCall(false);
      setIsCallCanceled(false);
      setIsCallAccepted(false);
      setIsIncomingCall(false);

      if (userVideoStream.current) {
        userVideoStream.current.srcObject = null;
      }

      connectionRef.current = null;
    });
  }, []);

  const handleCallUser = (userIdToCall: string) => {
    setIsCall(true);

    // Создается инстанс peer соединения
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    // Обработка события сигнала
    // TODO: При клике передавать id пользователя которому звоним вместо (user-id-to-call)
    peer.on('signal', (data) => {
      socket.emit('on-call', userId, userIdToCall, data);
    });

    // Обработка события стрим
    peer.on('stream', (stream) => {
      if (userVideoStream.current) {
        userVideoStream.current.srcObject = stream;
      }
    });

    // Обработка события когда пользователь которому звонят приян вызов
    socket.on('on-call-answer', (data: SignalData) => {
      setIsCallAccepted(true);

      // Установка сигнала
      peer.signal(data);
    });

    // Установка ооединения
    connectionRef.current = peer;
  };

  const handleCallAnswer = () => {
    setIsCall(false);
    setIsCallAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    // Обработка события получения сигнала
    peer.on('signal', (data) => {
      socket.emit('on-call-answer', data, userIdThatCall);
    });

    // Обработка события получения стрима
    peer.on('stream', (stream) => {
      if (userVideoStream.current) {
        userVideoStream.current.srcObject = stream;
      }
    });

    // Установка сигнала
    peer.signal(signal);

    // Установка ооединения
    connectionRef.current = peer;
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        columnGap: '16px',
        width: '100%',
        height: '100%',
        alignContent: 'start',
        position: 'absolute',
        top: '0',
        left: '0',
      }}
    >
      <Navigation />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          width: '100%',
          height: '100%',
          alignContent: 'start',
        }}
      >
        <Box>
          <Box sx={{ display: 'grid', padding: '16px' }}>
            <Box sx={{ display: 'grid', rowGap: '8px' }}>
              <Typography variant="h5">Общие (текст):</Typography>
              <Button
                sx={{ backgroundColor: theme.palette.common.white }}
                variant="outlined"
                color="primary"
                onClick={() => {
                  // TODO: Добавить модель комнаты и сообщений
                  socket.emit('on-channel-join', 'id-1', userId);
                }}
              >
                Чат 1
              </Button>
              <Button sx={{ backgroundColor: theme.palette.common.white }} variant="outlined" color="primary">
                Чат 2
              </Button>
              <Button sx={{ backgroundColor: theme.palette.common.white }} variant="outlined" color="primary">
                Чат 3
              </Button>
            </Box>
            <Box sx={{ display: 'grid', rowGap: '8px' }}>
              <Typography variant="h5">Аудио (аудио и видео):</Typography>
              <Button sx={{ backgroundColor: theme.palette.common.white }} variant="outlined" color="primary">
                Чат 1
              </Button>
              <Button sx={{ backgroundColor: theme.palette.common.white }} variant="outlined" color="primary">
                Чат 2
              </Button>
              <Button sx={{ backgroundColor: theme.palette.common.white }} variant="outlined" color="primary">
                Чат 3
              </Button>
            </Box>
            <Box sx={{ display: 'grid', rowGap: '8px', position: 'relative' }}>
              <Box sx={{ display: 'grid', rowGap: '8px', position: 'absolute', padding: '16px 0px' }}>
                <Typography variant="h5">Все друзья:</Typography>
                {friends?.map((friend) => {
                  return (
                    <Box
                      key={friend._id}
                      sx={{
                        display: 'inline-grid',
                        gridTemplateColumns: 'repeat(3, max-content)',
                        columnGap: '16px',
                        backgroundColor: theme.palette.common.white,
                        borderRadius: '8px',
                        border: `1px solid ${theme.palette.grey[300]}`,
                        padding: '8px 16px',
                      }}
                    >
                      <User email={friend.email} name={friend.name} status={friend.status} />
                      {/* Когда пользователь звонит и нет входящего вызова */}
                      {isCall && !isIncomingCall && !isCallAccepted && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setIsCall(false);
                            setIsCallCanceled(true);

                            socket.emit('on-call-end', friend._id);
                          }}
                        >
                          Отклонить звонок
                        </Button>
                      )}
                      {/* Когда пользователь не звонит и нет входящего вызова */}
                      {!isCall && !isIncomingCall && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleCallUser(friend._id);
                          }}
                        >
                          Позвонить пользователю
                        </Button>
                      )}
                      {/* Когда пользователю звонят */}
                      {isIncomingCall && !isCallAccepted && (
                        <Button variant="contained" color="primary" onClick={handleCallAnswer}>
                          Принять вызов
                        </Button>
                      )}
                      {/* Когда пользователю звонят и вызов еще не принят */}
                      {isIncomingCall && !isCallAccepted && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            socket.emit('on-call-end', friend._id);
                          }}
                        >
                          Отклонить вызов
                        </Button>
                      )}
                      {/* Когда вызов принят и еще не отменен */}
                      {isCallAccepted && !isCallCanceled && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            socket.emit('on-call-end', friend._id);
                          }}
                        >
                          Закончить вызов
                        </Button>
                      )}
                    </Box>
                  );
                })}
                <Typography variant="h5">
                  <Link sx={{ cursor: 'pointer' }} underline="hover" onClick={() => navigate(-1)}>
                    Назад
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'grid',
            backgroundColor: theme.palette.common.white,
            width: '100%',
            margin: '16px',
            borderRadius: '16px',
          }}
        >
          <Box sx={{ display: 'grid', gridAutoFlow: 'column', alignItems: 'center', gap: '32px', padding: '32px' }}>
            {/* Мое видео */}
            <Box sx={{ position: 'relative', width: '300px', borderRadius: '32px' }}>
              <video style={{ width: '300px',
    borderRadius: '32px' }} ref={myVideoStream} autoPlay muted playsInline />
            </Box>
            {/* Видео пользователя которому звонят */}
            {isCallAccepted && !isCallCanceled && (
              <Box sx={{ position: 'relative', width: '300px', borderRadius: '32px' }}>
                <video style={{ width: '300px',
    borderRadius: '32px' }} ref={userVideoStream} autoPlay playsInline />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const ChannelsMemoized = memo(Channels);
