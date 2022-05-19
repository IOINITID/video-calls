import { memo, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { CancelOutlined } from '@mui/icons-material';
import { Box, Divider, MenuItem, Select, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { theme } from 'core/theme';
import { useDeviceInfo, useUserMedia } from 'modules/user/hooks';
import { useNavigate } from 'react-router-dom';

const VoiceAndVideo = () => {
  const navigate = useNavigate();

  const { stream, userVideo, startUserMedia } = useUserMedia();
  const { audioInDevices, audioOutDevices, defaultAudioInDevice, defaultAudioOutDevice } = useDeviceInfo();

  const [audioInDevice, setAudioInDevice] = useState('');
  const [audioOutDevice, setAudioOutDevice] = useState('');

  useEffect(() => {
    if (defaultAudioInDevice) {
      setAudioInDevice(defaultAudioInDevice);
    }

    if (defaultAudioOutDevice) {
      setAudioOutDevice(defaultAudioOutDevice);
    }
  }, [defaultAudioInDevice, defaultAudioOutDevice]);

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
      {/* NOTE: Настройки голоса */}
      <Typography
        className={css`
          padding-bottom: 20px !important;
          font-weight: 600 !important;
          font-size: 20px !important;
          line-height: 24px !important;
          color: #ffffff !important;
        `}
      >
        Насройки голоса
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 320px)',
          alignItems: 'center',
          columnGap: '16px',
          marginBottom: '16px',
        }}
      >
        <Select id="audioInDevice" value={audioInDevice} onChange={(event) => setAudioInDevice(event.target.value)}>
          {audioInDevices.map((audioInDevice) => {
            return (
              <MenuItem
                key={audioInDevice.deviceId}
                sx={{ maxWidth: '320px', whiteSpace: 'normal' }}
                value={audioInDevice.deviceId}
              >
                {audioInDevice.label}
              </MenuItem>
            );
          })}
        </Select>
        <Select id="audioOutDevice" value={audioOutDevice} onChange={(event) => setAudioOutDevice(event.target.value)}>
          {audioOutDevices.map((audioOutDevice) => {
            return (
              <MenuItem
                key={audioOutDevice.deviceId}
                sx={{ maxWidth: '320px', whiteSpace: 'normal' }}
                value={audioOutDevice.deviceId}
              >
                {audioOutDevice.label}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      {/* NOTE: Настройки видео */}
      <Typography
        className={css`
          font-weight: 600 !important;
          font-size: 20px !important;
          line-height: 24px !important;
          color: #ffffff !important;
        `}
      >
        Насройки видео
      </Typography>

      <Divider sx={{ margin: '32px 0', borderColor: theme.palette.grey['800'] }} />

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
            boxShadow: `inset 0 0 0 1px ${theme.palette.grey['800']}`,
          }}
        >
          <Box
            sx={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
            component="video"
            ref={userVideo}
            autoPlay
            muted
          />
          {!stream && (
            <Button variant="contained" onClick={() => startUserMedia({ audio: true, video: true })}>
              Проверить видео
            </Button>
          )}
        </Box>
        {/* <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, max-content)',
            alignItems: 'center',
            columnGap: '16px',
          }}
        >
          <Button variant="contained" onClick={() => startUserMedia({ audio: true, video: true })}>
            Проверить видео
          </Button>
          <Button variant="contained" onClick={stopUserMedia}>
            Отключить видео
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export const VoiceAndVideoMemoized = memo(VoiceAndVideo);
