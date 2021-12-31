import { Box, Typography } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { userFriendsSelector, userInvitesSelector, userUsersSelector } from '../../../modules/user/store/selectors';
import { socket } from '../../containers/app-container/app-container';
import { axiosInstance } from '../../services/axios-instance';
import { theme } from '../../theme';
import { Button } from '../button';

const AllUsers = () => {
  const users = useSelector(userUsersSelector);
  const friends = useSelector(userFriendsSelector);
  const invites = useSelector(userInvitesSelector);

  return (
    <Box sx={{ display: 'grid', rowGap: '8px', position: 'absolute', top: '0', left: '0', padding: '16px' }}>
      {/* Все пользователи */}
      <Typography variant="h5">Все пользователи:</Typography>
      {users?.map((user) => {
        return (
          <Box
            key={user._id}
            sx={{
              display: 'inline-grid',
              gridAutoFlow: 'column',
              alignItems: 'center',
              columnGap: '16px',
              backgroundColor: theme.palette.common.white,
              borderRadius: '8px',
              border: `1px solid ${theme.palette.grey[300]}`,
              padding: '8px 16px',
            }}
          >
            <Typography>{user.email}</Typography>
            <Typography>{user.status}</Typography>
            <Box sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: '16px' }}>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/add-invite-to-friends', { friendId: user._id });

                  socket.emit('on-add-invite-to-friends', user._id);

                  return response.data;
                }}
              >
                Добавить в друзья
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/add-to-friends', { friendId: user._id });

                  return response.data;
                }}
              >
                Принять
              </Button>
              <Button variant="contained" onClick={() => null}>
                Отклонить
              </Button>
            </Box>
          </Box>
        );
      })}
      {/* Все друзья */}
      <Typography variant="h5">Все друзья:</Typography>
      {friends?.map((friend) => {
        return (
          <Box
            key={friend._id}
            sx={{
              display: 'inline-grid',
              gridAutoFlow: 'column',
              columnGap: '16px',
              backgroundColor: theme.palette.common.white,
              borderRadius: '8px',
              border: `1px solid ${theme.palette.grey[300]}`,
              padding: '8px 16px',
            }}
          >
            <Typography>{friend.email}</Typography>
            <Typography>{friend.status}</Typography>
          </Box>
        );
      })}
      {/* Запросы в друзья */}
      <Typography variant="h5">Запросы в друзья:</Typography>
      {invites?.map((invite) => {
        return (
          <Box
            key={invite._id}
            sx={{
              display: 'inline-grid',
              gridAutoFlow: 'column',
              columnGap: '16px',
              backgroundColor: theme.palette.common.white,
              borderRadius: '8px',
              border: `1px solid ${theme.palette.grey[300]}`,
              padding: '8px 16px',
            }}
          >
            <Typography>{invite.email}</Typography>
            <Typography>{invite.status}</Typography>
            <Box sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: '16px' }}>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/add-to-friends', { friendId: invite._id });

                  // TODO: Продолжить добавление в друзья пользователя
                  return response.data;
                }}
              >
                Принять
              </Button>
              <Button variant="contained" onClick={() => null}>
                Отклонить
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export const AllUsersMemoized = memo(AllUsers);
