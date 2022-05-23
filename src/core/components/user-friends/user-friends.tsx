import { Avatar, Badge, Box, colors, Menu, MenuItem, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { Chat, Call, MoreVert } from '@mui/icons-material';
import { theme } from '../../theme';
import { socket } from '../../utils/socket';
import { axiosInstance } from '../../utils/axios-instance';

const UserFriends = ({ id, name, status, image }: { id: string; name: string; status: string; image: string }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        alignItems: 'center',
      }}
    >
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
          <Avatar sx={{ backgroundColor: colors.deepPurple[500] }} src={image} />
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
        <Box sx={{ cursor: 'pointer' }} onClick={(event) => setAnchorEl(event.currentTarget)}>
          <MoreVert />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Написать</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Позвонить</MenuItem>
        <MenuItem
          onClick={async () => {
            setAnchorEl(null);

            const response = await axiosInstance.post('/remove-from-friends', { friendId: id });

            socket.emit('on-remove-from-friends', id); // Отправка события пользователю, которого удаляют из друзей

            return response.data;
          }}
        >
          Удалить из друзей
        </MenuItem>
      </Menu>
    </Box>
  );
};

export const UserFriendsMemoized = memo(UserFriends);
