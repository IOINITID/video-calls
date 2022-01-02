import { memo, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Button } from '../../../../core/components/button';
import { theme } from '../../../../core/theme';

const Channels = () => {
  const myVideoStream = useRef<HTMLVideoElement | null>(null);

  const getMediaStream = async () => {
    const myMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    if (myVideoStream.current) {
      myVideoStream.current.srcObject = myMediaStream;
    }
  };

  useEffect(() => {
    getMediaStream();
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
