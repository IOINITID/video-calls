/* eslint-disable jsx-a11y/media-has-caption */
import { memo, useEffect, useRef, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Button } from '../../../../core/components/button';
import { theme } from '../../../../core/theme';
import { socket } from '../../../../core/containers/app-container/app-container';
import { useDispatch, useSelector } from 'react-redux';
import {
  userFriendsSelector,
  userIdSelector,
  userIsCallAcceptedSelector,
  userIsCallCanceledSelector,
  userIsCallSelector,
  userIsIncomingCallSelector,
} from '../../../user/store/selectors';
import Peer, { Instance, SignalData } from 'simple-peer';
import { User } from '../../../../core/components/user';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '../../../../core/components/navigation';
import notificationCallSound from '../../../../core/assets/notication-call-sound.mp3';
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';
import { setIsCall, setIsCallAccepted, setIsCallCanceled, setIsIncomingCall } from '../../../user/store/user';

const Channels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector(userIdSelector);
  const friends = useSelector(userFriendsSelector);

  const isCall = useSelector(userIsCallSelector); // Звоню я или нет
  const isIncomingCall = useSelector(userIsIncomingCallSelector); // Звонят мне или нет
  const isCallAccepted = useSelector(userIsCallAcceptedSelector); // Вызов принят или нет
  const isCallCanceled = useSelector(userIsCallCanceledSelector); // Вызов отменен или нет

  const [stream, setStream] = useState<MediaStream>(); // Мой стрим
  const [signal, setSignal] = useState<SignalData | string>(''); // Сигнал от пользователя, который звонит
  const [userIdThatCall, setUserIdThatCall] = useState(''); // Id пользователя, который звонит
  // const [isCall, setIsCall] = useState(false); // Звоню я или нет
  // const [isIncomingCall, setIsIncomingCall] = useState(false); // Звонят мне или нет
  // const [isCallAccepted, setIsCallAccepted] = useState(false); // Вызов принят или нет
  // const [isCallCanceled, setIsCallCanceled] = useState(false); // Вызов отменен или нет
  const [audioStream, setAudioStream] = useState<MediaStreamTrack[] | null>(null); // Аудио дорожка пользователя
  const [videoStream, setVideoStream] = useState<MediaStreamTrack[] | null>(null); // Видео дорожка пользователя
  const [isAudio, setIsAudio] = useState(true); // Включен ли мой звуковой поток
  const [isVideo, setIsVideo] = useState(true); // Включен ли мой видеоs поток

  const myVideoStream = useRef<HTMLVideoElement | null>(null); // Мое видео
  const userVideoStream = useRef<HTMLVideoElement | null>(null); // Видео пользователя с кем звонок
  const audioInterval = useRef<ReturnType<typeof setTimeout> | null>(null); // Ссылка на аудио интервал при входящем звонке
  const audioCallTheme = useRef<HTMLAudioElement | null>(null); // Аудио пользователя
  const connectionRef = useRef<Instance | null>(null); // Ссылка соединения

  // Получает медиа стрим (аудио и видео)
  const getMediaStream = async ({ video = true, audio = true }: { video?: boolean; audio?: boolean } = {}) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video, audio });

      console.log('stream', stream);

      // Установка всего стрима пользователя
      setStream(stream);

      // Установка аудио стрима пользователя
      setAudioStream(stream.getAudioTracks());

      // Установка видеострима пользователя
      setVideoStream(stream.getVideoTracks());

      if (myVideoStream.current) {
        myVideoStream.current.srcObject = stream;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Останавливает стрим (аудио и видео), все дорожки
  const handleStopMediaStream = (stream: MediaStream) => {
    if (stream) {
      stream.getTracks().forEach((value) => value.stop());
    }
  };

  // Переключает аудио стрим
  const handleSwitchAudioStream = (isAudio: boolean) => {
    if (audioStream) {
      audioStream.forEach((value) => {
        value.enabled = isAudio;
      });
    }
  };

  // Переключает видео стрим
  const handleSwitchVideoStream = (isVideo: boolean) => {
    if (videoStream) {
      videoStream.forEach((value) => {
        value.enabled = isVideo;
        // value.stop(); // Отключает видеострим полностью (индикатор)
      });
    }
  };

  // Переключает микрофон пользователя
  useEffect(() => {
    handleSwitchAudioStream(isAudio);
  }, [isAudio]);

  // Переключает видео пользователя
  useEffect(() => {
    handleSwitchVideoStream(isVideo);
  }, [isVideo]);

  useEffect(() => {
    // TODO: Добавить включение видео и аудио
    getMediaStream();

    socket.on('on-call', (signal, user) => {
      setSignal(signal);
      setUserIdThatCall(user);

      dispatch(setIsIncomingCall(true));

      // Включает звук при входящем вызове
      if (audioCallTheme.current) {
        audioCallTheme.current.src = notificationCallSound;
        audioCallTheme.current.play();
      }

      // Включает интервал повтора аудио через 2 секунды
      audioInterval.current = setInterval(() => {
        if (audioCallTheme.current) {
          audioCallTheme.current.src = notificationCallSound;
          audioCallTheme.current.play();
        }
      }, 2000);
    });

    socket.on('on-call-end', () => {
      // TODO: Доделать логику отображения при принятии вызова и его отмене
      dispatch(setIsCall(false));
      dispatch(setIsIncomingCall(false));
      dispatch(setIsCallAccepted(false));
      dispatch(setIsCallCanceled(false));

      if (userVideoStream.current) {
        userVideoStream.current.srcObject = null;
      }

      // Выключает звук при вызове
      if (audioCallTheme.current) {
        audioCallTheme.current.src = '';
        audioCallTheme.current.pause();
        audioCallTheme.current.load();
      }

      // Очищает повтор аудио при принятии входящего вызова
      if (audioInterval.current) {
        clearInterval(audioInterval.current);
      }

      connectionRef.current = null;
    });
  }, []);

  const handleCallUser = (userIdToCall: string) => {
    dispatch(setIsCall(true));

    // Создается инстанс peer соединения
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    console.log('peer', peer);

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
      dispatch(setIsCallAccepted(true));

      // Установка сигнала
      peer.signal(data);

      // Выключает звук при вызове
      if (audioCallTheme.current) {
        audioCallTheme.current.src = '';
        audioCallTheme.current.pause();
        audioCallTheme.current.load();
      }

      // Очищает повтор аудио при принятии входящего вызова
      if (audioInterval.current) {
        clearInterval(audioInterval.current);
      }
    });

    // Установка ооединения
    connectionRef.current = peer;

    // Включает звук при вызове
    if (audioCallTheme.current) {
      audioCallTheme.current.src = notificationCallSound;
      audioCallTheme.current.play();
    }

    // Включает интервал повтора аудио через 2 секунды

    audioInterval.current = setInterval(() => {
      if (audioCallTheme.current) {
        audioCallTheme.current.src = notificationCallSound;
        audioCallTheme.current.play();
      }
    }, 2000);
  };

  const handleCallAnswer = () => {
    dispatch(setIsCall(false));
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

    // Выключает звук при вызове
    if (audioCallTheme.current) {
      audioCallTheme.current.src = '';
      audioCallTheme.current.pause();
      audioCallTheme.current.load();
    }

    // Очищает повтор аудио при принятии входящего вызова
    if (audioInterval.current) {
      clearInterval(audioInterval.current);
    }
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
      {/* Музыка при звонке или входящем вызове */}
      <audio ref={audioCallTheme} />

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
                  socket.emit('on-channel-join', 'channel-text-1', userId);
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
                            dispatch(setIsCall(false));
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
                  <Link
                    sx={{ cursor: 'pointer' }}
                    underline="hover"
                    onClick={() => {
                      navigate(-1);

                      // Отключает мой стрим
                      if (stream) {
                        handleStopMediaStream(stream);
                      }
                    }}
                  >
                    Назад
                  </Link>
                  <Button onClick={() => setIsAudio(!isAudio)}>
                    {isAudio ? (
                      <Box
                        sx={{
                          display: 'grid',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          borderRadius: '50%',
                          backgroundColor: theme.palette.common.white,
                        }}
                      >
                        <Mic />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'grid',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          borderRadius: '50%',
                          backgroundColor: theme.palette.common.white,
                        }}
                      >
                        <MicOff />
                      </Box>
                    )}
                  </Button>
                  <Button onClick={() => setIsVideo(!isVideo)}>
                    {isVideo ? (
                      <Box
                        sx={{
                          display: 'grid',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          borderRadius: '50%',
                          backgroundColor: theme.palette.common.white,
                        }}
                      >
                        <Videocam />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'grid',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '8px',
                          borderRadius: '50%',
                          backgroundColor: theme.palette.common.white,
                        }}
                      >
                        <VideocamOff />
                      </Box>
                    )}
                  </Button>
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
