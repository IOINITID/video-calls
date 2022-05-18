import { css } from '@emotion/css';
import { CancelOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { RootState } from 'core/store/types';
import { theme } from 'core/theme';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VoiceAndVideo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

  const [stream, setStream] = useState<MediaStream>();

  const userVideo = useRef<HTMLVideoElement | null>();

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        padding: '60px 40px 80px 40px',
        alignContent: 'start',
        backgroundColor: '#5e6065',
      }}
    >
      {/* NOTE: Настройки голоса */}
      <Typography
        className={css`
          padding-bottom: 20px !important;
          font-weight: 600 !important;
          font-size: 20px !important;
          line-height: 24px !important;
          color: #ffffff !important;
          border-bottom: 1px solid #000000;
        `}
      >
        Насройки голоса
      </Typography>
      <Box
        sx={{
          display: 'grid',
          rowGap: '8px',
          position: 'absolute',
          top: '60px',
          right: '-40px',
          textAlign: 'center',
          cursor: 'pointer',

          '&:hover svg, &:focus svg': {
            fill: '#ffffff',
          },
        }}
        onClick={() => navigate('/friends')}
      >
        <CancelOutlined sx={{ width: '36px', height: '36px', fill: '#b9bbbe' }} />
        <Typography sx={{ fontSize: '13px', color: '#b9bbbe' }}>ESC</Typography>
      </Box>
      {/* NOTE: Настройки видео */}
      <Typography
        className={css`
          padding-bottom: 20px !important;
          font-weight: 600 !important;
          font-size: 20px !important;
          line-height: 24px !important;
          color: #ffffff !important;
          border-bottom: 1px solid #000000;
        `}
      >
        Насройки видео
      </Typography>
      <Box sx={{ display: 'grid', rowGap: '16px' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '220px',
            backgroundColor: theme.palette.grey['500'],
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            boxShadow: `inset 0 0 0 1px ${theme.palette.grey['900']}`,
          }}
        >
          <Box
            sx={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
            component="video"
            ref={userVideo}
            autoPlay
            muted
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, max-content)',
            alignItems: 'center',
            columnGap: '16px',
          }}
        >
          <Button
            variant="contained"
            onClick={async () => {
              const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });

              setStream(stream);

              if (stream && userVideo.current) {
                userVideo.current.srcObject = stream;
              }
            }}
          >
            Проверить видео
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (stream && userVideo.current) {
                stream.getTracks().forEach((track) => track.stop());
                userVideo.current.srcObject = null;
              }
            }}
          >
            Отключить видео
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const VoiceAndVideoMemoized = memo(VoiceAndVideo);
