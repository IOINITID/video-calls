import { Avatar, Badge, Box, colors, Typography } from '@mui/material';
import { memo } from 'react';
import { theme } from '../../theme';
import { axiosInstance } from '../../utils/axios-instance';
import { socket } from '../../utils/socket';
import { Button } from '../button';

const UserAddToFriends = ({ id, name, status, image }: { id: string; name: string; status: string; image: string }) => {
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
          gridTemplateColumns: 'repeat(2, max-content)',
          columnGap: '24px',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const response = await axiosInstance.post('/add-to-friends', { friendId: id });

            socket.emit('on-add-to-friends', id); // Отправка события пользователю который ждет принятие приглашения

            return response.data;
          }}
        >
          Добавить
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const response = await axiosInstance.post('/remove-invite-to-friends', { friendId: id });

            socket.emit('on-remove-invite-to-friends', id); // Отправка события пользователю который ждет принятия или отклонения приглашения

            return response.data;
          }}
        >
          Отклонить
        </Button>
      </Box>
    </Box>
  );
};

export const UserAddToFriendsMemoized = memo(UserAddToFriends);
