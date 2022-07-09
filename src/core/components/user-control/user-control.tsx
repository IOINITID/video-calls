import { memo, useEffect, useState } from 'react';
import { Avatar, Badge, Box, IconButton, Tooltip, Typography } from '@mui/material';
import { theme } from '../../theme';
import {
  SignalCellular3BarRounded,
  Mic,
  MicOff,
  SignalCellular1BarRounded,
  SignalCellular2BarRounded,
  Videocam,
  VideocamOff,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'core/store/types';
import { setMediaAction } from 'modules/user/store';
import { socket } from 'core/utils/socket';

const UserControl = () => {
  const dispatch = useDispatch();

  const { user, media } = useSelector((state: RootState) => state.user);
  const { meet, meetState } = useSelector((state: RootState) => state.meet);

  const [ping, setPing] = useState(0);

  useEffect(() => {
    const getPing = () => {
      const timestamp = Date.now();

      socket.emit('client:ping', timestamp);
    };

    const getPingInterval = setInterval(getPing, 5000);

    if (meetState === 'connected') {
      getPingInterval;
    }

    socket.on('server:ping', (timestamp: number) => {
      setPing(Date.now() - timestamp);
    });

    return () => {
      clearInterval(getPingInterval);
      socket.removeListener('server:ping');
    };
  }, [meetState]);

  const tooltipPingInfo =
    ping <= 50
      ? `Хорошее качество связи: ${ping + 'ms'}`
      : ping <= 100
      ? `Нормальное качество связи: ${ping + 'ms'}`
      : `Плохое качество связи: ${ping + 'ms'}`;

  return (
    <Box sx={{ display: 'grid', alignItems: 'center', backgroundColor: theme.palette.grey[300], padding: '12px 20px' }}>
      <Box sx={{ display: 'grid', columnGap: '8px', gridTemplateColumns: '40px 1fr max-content' }}>
        {/* Аватар пользователя */}
        <Box
          sx={{
            '.MuiBadge-badge': {
              border: `1px solid ${theme.palette.common.white}`,
            },
            '.MuiBadge-colorSuccess': {
              backgroundColor: theme.palette.success.light,
            },
            '.MuiBadge-colorError': {
              backgroundColor: theme.palette.error.light,
            },
          }}
        >
          <Badge
            overlap="circular"
            variant="dot"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            color={user?.status === 'online' ? 'success' : 'error'}
          >
            <Avatar sx={{ backgroundColor: user?.color ? user.color : user?.default_color }} src={user?.image} />
          </Badge>
        </Box>
        {/* Имя пользователя */}
        <Box>
          <Typography variant="body2">{user?.name}</Typography>
          <Typography sx={{ color: theme.palette.grey[500] }} variant="caption">
            #{user?.id.slice(-4)}
          </Typography>
        </Box>
        {/* TODO: Добавить компонент статуса связи - пинг */}
        {/* Кнопки управления */}
        {meetState === 'connected' && (
          <Box
            sx={{
              display: 'grid',
              columnGap: '16px',
              gridTemplateColumns: 'repeat(3, max-content)',
              alignItems: 'center',
            }}
          >
            <Box>
              <Tooltip title={tooltipPingInfo} arrow>
                <IconButton>
                  {ping <= 50 ? (
                    <SignalCellular3BarRounded sx={{ color: theme.palette.grey[700] }} />
                  ) : ping <= 100 ? (
                    <SignalCellular2BarRounded sx={{ color: theme.palette.grey[700] }} />
                  ) : (
                    <SignalCellular1BarRounded sx={{ color: theme.palette.grey[700] }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            <IconButton
              onClick={() => {
                if (meet.user?.id) {
                  socket.emit('client:media_state_change', {
                    media: { ...media, audio: !media.audio },
                    userFromCall: user,
                    userToCall: meet.user,
                  });
                }

                dispatch(setMediaAction({ ...media, audio: !media.audio }));
              }}
            >
              {media.audio ? (
                <Mic sx={{ color: theme.palette.grey[700] }} />
              ) : (
                <MicOff sx={{ color: theme.palette.grey[700] }} />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                if (meet.user?.id) {
                  socket.emit('client:media_state_change', {
                    media: { ...media, video: !media.video },
                    userFromCall: user,
                    userToCall: meet.user,
                  });
                }

                dispatch(setMediaAction({ ...media, video: !media.video }));
              }}
            >
              {media.video ? (
                <Videocam sx={{ color: theme.palette.grey[700] }} />
              ) : (
                <VideocamOff sx={{ color: theme.palette.grey[700] }} />
              )}
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const UserControlMemoized = memo(UserControl);
