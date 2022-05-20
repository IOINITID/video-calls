import { memo, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import { CancelOutlined } from '@mui/icons-material';
import {
  Box,
  Divider,
  FormControlLabel,
  LinearProgress,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Typography,
} from '@mui/material';
import { Button } from 'core/components/button';
import { theme } from 'core/theme';
import { useDeviceInfo, useUserMedia } from 'modules/user/hooks';
import { useNavigate } from 'react-router-dom';

const VoiceAndVideo = () => {
  const navigate = useNavigate();

  const { state, stream, userVideo, getUserMedia, getUserAudio, audioTracks } = useUserMedia();
  const {
    audioInDevices,
    audioOutDevices,
    videoInDevices,
    defaultAudioInDevice,
    defaultAudioOutDevice,
    defaultVideoInDevice,
    getDeviceInfo,
  } = useDeviceInfo();
  const [audioInDevice, setAudioInDevice] = useState('');
  const [audioOutDevice, setAudioOutDevice] = useState('');
  const [videoInDevice, setVideoInDevice] = useState('');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const audio = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (defaultAudioInDevice) {
      setAudioInDevice(defaultAudioInDevice);
    }

    if (defaultAudioOutDevice) {
      setAudioOutDevice(defaultAudioOutDevice);
    }

    if (defaultVideoInDevice) {
      setVideoInDevice(defaultVideoInDevice);
    }
  }, [defaultAudioInDevice, defaultAudioOutDevice, defaultVideoInDevice]);

  useEffect(() => {
    if (state === 'fulfilled') {
      getDeviceInfo();
    }
  }, [state]);

  useEffect(() => {
    getUserAudio({ audio: true });
  }, []);

  useEffect(() => {
    // getUserMedia({ audio: true });

    if (state === 'fulfilled' && audio.current && audioTracks) {
      audio.current.srcObject = audioTracks;
    }
  }, [state, audioTracks]);

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
        <Box>
          <Typography>Устройство ввода</Typography>
          <Select
            id="audioInDevice"
            value={audioInDevice || 'default'}
            onChange={(event) => setAudioInDevice(event.target.value)}
            fullWidth
          >
            {audioInDevices.map((audioInDevice) => {
              return (
                <MenuItem
                  key={audioInDevice.deviceId}
                  sx={{ maxWidth: '320px', whiteSpace: 'normal' }}
                  value={audioInDevice.deviceId || 'default'}
                >
                  {audioInDevice.label || 'Default'}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <Box>
          <Typography>Устройство вывода</Typography>
          <Select
            id="audioOutDevice"
            value={audioOutDevice || 'default'}
            onChange={(event) => setAudioOutDevice(event.target.value)}
            fullWidth
          >
            {audioOutDevices.map((audioOutDevice) => {
              return (
                <MenuItem
                  key={audioOutDevice.deviceId}
                  sx={{ maxWidth: '320px', whiteSpace: 'normal' }}
                  value={audioOutDevice.deviceId || 'default'}
                >
                  {audioOutDevice.label || 'Default'}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        {/* NOTE: Громкость микрофона */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 320px)',
            alignItems: 'center',
            columnGap: '16px',
            marginBottom: '16px',
          }}
        >
          <Box>
            <Typography>Громкость микрофона</Typography>
            <Slider defaultValue={100} valueLabelDisplay="auto" max={100} />
          </Box>
          <Box>
            <Typography>Громкость звука</Typography>
            <Slider defaultValue={100} valueLabelDisplay="auto" max={200} />
          </Box>
        </Box>
      </Box>
      {/* NOTE: Громкость микрофона */}
      <Box
        sx={{
          display: 'grid',
          marginBottom: '16px',
        }}
      >
        <Typography>Проверка микрофона</Typography>
        <Typography variant="caption">
          Проблемы с микрофоном? Начните проверку и скажите какую-нибудь ерунду - мы тут же ее воспроизведем.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', alignItems: 'center', columnGap: '8px' }}>
          <Button variant="contained" onClick={() => setIsAudioActive(!isAudioActive)}>
            {isAudioActive ? 'Прекратить проверку' : 'Давайте проверим'}
          </Button>
          <Box>
            <LinearProgress variant="determinate" value={0} />
            {isAudioActive && <Typography variant="caption">Воспроизводим ваш прекрасный голос</Typography>}
          </Box>
          {/* NOTE: Audio компонент */}
          <Box component="audio" ref={audio} autoPlay muted={!isAudioActive} />
        </Box>
        <Typography variant="caption">
          Нужна помощь с голосовым или видеочатом? Ознакомьтесь с нашим{' '}
          <Link>руководством по устранению неполадок</Link>.
        </Typography>
      </Box>
      <Divider sx={{ margin: '32px 0', borderColor: theme.palette.grey['800'] }} />
      {/* NOTE: Режим ввода */}
      <Box>
        <Typography>Режим ввода</Typography>
        <RadioGroup defaultValue="voice">
          <FormControlLabel value="voice" control={<Radio />} label="Активация по голосу" />
          <FormControlLabel value="button" control={<Radio />} label="Режим рации (ограниченный)" />
        </RadioGroup>
      </Box>
      {/* NOTE: Чувствительность ввода */}
      <Box>
        <Typography>Чувствительнось ввода</Typography>
        <Slider defaultValue={40} valueLabelDisplay="auto" max={100} />
        {/* TODO: Добавить текущий уровень ввода */}
        {/* {noPermission && (
          <Typography>
            У вас нет подключенных устройств ввода. Вы должны разрешить Video Calls{' '}
            <Link>доступ к вашему микрофону</Link> для того, чтобы вы могли наблюдать чувствительность устройств ввода.
          </Typography>
        )} */}
      </Box>
      <Divider sx={{ margin: '32px 0', borderColor: theme.palette.grey['800'] }} />
      {/* NOTE: Настройки видео */}
      <Box>
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
              <Button variant="contained" onClick={() => getUserMedia({ audio: true, video: true })}>
                Проверить видео
              </Button>
            )}
          </Box>
        </Box>
      </Box>
      {/* NOTE: Предпросмотр видео */}
      <Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, max-content)',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>Препросмотр видео (всегда)</Typography>
          <Switch checked={false} />
        </Box>
        <Typography>Использовать предпросмотр каждый раз, как вы включаете видео</Typography>
      </Box>
      {/* NOTE: Камера */}
      <Box>
        <Typography>Камера</Typography>
        <Select
          id="videoInDevice"
          value={videoInDevice || 'default'}
          onChange={(event) => setVideoInDevice(event.target.value)}
          fullWidth
        >
          {videoInDevices.map((videoInDevice) => {
            return (
              <MenuItem
                key={videoInDevice.deviceId}
                sx={{ maxWidth: '320px', whiteSpace: 'normal' }}
                value={videoInDevice.deviceId || 'default'}
              >
                {videoInDevice.label || 'Default'}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
      <Divider sx={{ margin: '32px 0', borderColor: theme.palette.grey['800'] }} />
      {/* NOTE: Расширенные */}
      <Box>
        <Typography>Расширенные</Typography>
        {/* NOTE: Аудио кодек */}
        <Box>
          <Typography>Аудио кодек</Typography>
          <Box sx={{ border: '1px solid #000000' }}>
            <Typography>
              Video Calls использует отборный, органический, выращенный на домашней грядке голосовой кодек Opus,
            </Typography>
          </Box>
        </Box>
        {/* NOTE: Обработка голоса */}
        <Box>
          <Typography>Обработка голоса</Typography>
          <Box>
            <Typography>Эхоподавление</Typography>
            <Switch checked={true} />
          </Box>
          <Divider sx={{ margin: '8px 0', borderColor: theme.palette.grey['800'] }} />
          <Box>
            <Typography>Шумоподавление</Typography>
            <Switch checked={false} />
          </Box>
          <Divider sx={{ margin: '8px 0', borderColor: theme.palette.grey['800'] }} />
          <Box>
            <Typography>Автоматическа регулировка усиления</Typography>
            <Switch checked={true} />
          </Box>
          <Divider sx={{ margin: '8px 0', borderColor: theme.palette.grey['800'] }} />
        </Box>
        {/* NOTE: Сбросить голосовые настройки */}
        <Box>
          <Button variant="outlined" color="error">
            Сбросить голосовые настройки
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export const VoiceAndVideoMemoized = memo(VoiceAndVideo);
