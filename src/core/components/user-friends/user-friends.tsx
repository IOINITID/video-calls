import { Avatar, Badge, Box, colors, Typography } from '@mui/material';
import { memo } from 'react';
import { Chat, Call, MoreVert } from '@mui/icons-material';
import { theme } from '../../theme';

const UserFriends = ({ name, status }: { name: string; status: string }) => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          columnGap: '8px',
          alignItems: 'center',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
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
          color={status === 'online' ? 'success' : 'error'}
        >
          <Avatar sx={{ backgroundColor: colors.deepPurple[500] }} />
        </Badge>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content' }}>
          <Typography variant="body2">{name ? name : ''}</Typography>
          <Typography variant="caption">{status === 'online' ? 'В сети' : 'Не в сети'}</Typography>
        </Box>
      </Box>
      {/* Кнопки взаимодействия с пользователем */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 24px)',
          columnGap: '24px',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Box sx={{ cursor: 'pointer' }}>
          <Chat />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <Call />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <MoreVert />
        </Box>
      </Box>
    </Box>
  );
};

export const UserFriendsMemoized = memo(UserFriends);
