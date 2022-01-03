import { memo, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from '../../../../core/components/button';
import { theme } from '../../../../core/theme';
import { socket } from '../../../../core/containers/app-container/app-container';
import { useSelector } from 'react-redux';
import { userIdSelector } from '../../../user/store/selectors';

const Channels = () => {
  const userId = useSelector(userIdSelector);
  const [myStream, setStream] = useState<MediaStream>();

  const myVideoStream = useRef<HTMLVideoElement | null>(null);
  const userVideoStream = useRef<HTMLVideoElement | null>(null);

  const getMediaStream = async () => {
    try {
      const myMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

      setStream(myMediaStream);

      if (myVideoStream.current) {
        myVideoStream.current.srcObject = myMediaStream;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // TODO: Добавить включение видео и аудио
    // getMediaStream();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '300px 900px',
        width: '100%',
        height: '100%',
        alignContent: 'start',
        position: 'absolute',
        top: '0',
        left: '0',
      }}
    >
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
        <Box sx={{ display: 'grid', alignItems: 'center', gap: '32px', padding: '32px' }}>
          <Box sx={{ position: 'relative', width: '300px', borderRadius: '32px' }}>
            <video style={{ width: '300px',
    borderRadius: '32px' }} ref={myVideoStream} autoPlay muted playsInline />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const ChannelsMemoized = memo(Channels);
