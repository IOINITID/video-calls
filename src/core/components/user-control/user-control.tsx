import { memo } from 'react';
import { Avatar, Badge, Box, colors, Typography } from '@mui/material';
import { theme } from '../../theme';
import { MicOff, Settings, VideocamOff } from '@mui/icons-material';

const UserControl = () => {
  return (
    <Box sx={{ display: 'grid', alignItems: 'center', backgroundColor: theme.palette.grey[300], padding: '12px 20px' }}>
      <Box sx={{ display: 'grid', columnGap: '8px', gridTemplateColumns: '40px 1fr 104px' }}>
        {/* Аватар пользователя */}
        <Box>
          <Badge
            overlap="circular"
            variant="dot"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            color={status === 'online' ? 'success' : 'error'}
          >
            <Avatar sx={{ backgroundColor: colors.deepPurple[500] }}></Avatar>
          </Badge>
        </Box>
        {/* Имя пользователя */}
        <Box>
          <Typography variant="body2">Имя пользователя</Typography>
          <Typography sx={{ color: theme.palette.grey[500] }} variant="caption">
            #0001
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
