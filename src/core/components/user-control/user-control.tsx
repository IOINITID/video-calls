import { memo, useState } from 'react';
import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material';
import { theme } from '../../theme';
import { Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userUserSelector } from '../../../modules/user/store/selectors';

const UserControl = () => {
  const user = useSelector(userUserSelector);

  const [isMic, setIsMic] = useState(false);
  const [isVideocam, setIsVideocam] = useState(false);

  return (
    <Box sx={{ display: 'grid', alignItems: 'center', backgroundColor: theme.palette.grey[300], padding: '12px 20px' }}>
      <Box sx={{ display: 'grid', columnGap: '8px', gridTemplateColumns: '40px 1fr 96px' }}>
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
            <Avatar sx={{ backgroundColor: user?.color }} src={user?.image} />
          </Badge>
        </Box>
        {/* Имя пользователя */}
        <Box>
          <Typography variant="body2">{user?.name}</Typography>
          <Typography sx={{ color: theme.palette.grey[500] }} variant="caption">
            #{user?.id.slice(-4)}
          </Typography>
        </Box>
        {/* Кнопки управления */}
        <Box sx={{ display: 'grid', columnGap: '16px', gridTemplateColumns: 'repeat(2, 40px)', alignItems: 'center' }}>
          <IconButton onClick={() => setIsMic(!isMic)}>
            {isMic ? (
              <Mic sx={{ color: theme.palette.grey[700] }} />
            ) : (
              <MicOff sx={{ color: theme.palette.grey[700] }} />
            )}
          </IconButton>
          <IconButton onClick={() => setIsVideocam(!isVideocam)}>
            {isVideocam ? (
              <Videocam sx={{ color: theme.palette.grey[700] }} />
            ) : (
              <VideocamOff sx={{ color: theme.palette.grey[700] }} />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export const UserControlMemoized = memo(UserControl);
