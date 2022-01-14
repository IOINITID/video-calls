import { memo } from 'react';
import { Avatar, Badge, Box, colors, Typography } from '@mui/material';
import { theme } from '../../theme';
import { MicOff, Settings, VideocamOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userIdSelector, userNameSelector, userStatusSelector } from '../../../modules/user/store/selectors';

const UserControl = () => {
  const userName = useSelector(userNameSelector);
  const userId = useSelector(userIdSelector);
  const userStatus = useSelector(userStatusSelector);

  return (
    <Box sx={{ display: 'grid', alignItems: 'center', backgroundColor: theme.palette.grey[300], padding: '12px 20px' }}>
      <Box sx={{ display: 'grid', columnGap: '8px', gridTemplateColumns: '40px 1fr 104px' }}>
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
            color={userStatus === 'online' ? 'success' : 'error'}
          >
            <Avatar sx={{ backgroundColor: colors.deepPurple[500] }}></Avatar>
          </Badge>
        </Box>
        {/* Имя пользователя */}
        <Box>
          <Typography variant="body2">{userName}</Typography>
          <Typography sx={{ color: theme.palette.grey[500] }} variant="caption">
            #{userId.slice(-4)}
          </Typography>
        </Box>
        {/* Кнопки управления */}
        <Box sx={{ display: 'grid', columnGap: '16px', gridTemplateColumns: 'repeat(3, 24px)', alignItems: 'center' }}>
          <MicOff sx={{ color: theme.palette.grey[700] }} />
          <VideocamOff sx={{ color: theme.palette.grey[700] }} />
          <Settings sx={{ color: theme.palette.grey[700] }} />
        </Box>
      </Box>
    </Box>
  );
};

export const UserControlMemoized = memo(UserControl);
