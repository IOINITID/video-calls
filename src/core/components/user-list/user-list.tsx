import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { userUsersSelector } from '../../../modules/user/store/selectors';
import { theme } from '../../theme';
import { Button } from '../button';
import { axiosInstance } from '../../utils/axios-instance';
import { socket } from '../../utils/socket';

const UserList = () => {
  const users = useSelector(userUsersSelector);

  return (
    <Box sx={{ display: 'grid', rowGap: '8px', position: 'absolute', top: '0', left: '0', padding: '16px' }}>
      <Typography variant="h5">Все пользователи:</Typography>
      {users?.map((user) => {
        return (
          <Box
            key={user.id}
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
                  const response = await axiosInstance.post('/add-invite-to-friends', { friendId: user.id });

                  socket.emit('on-add-invite-to-friends', user.id);

                  return response.data;
                }}
              >
                Добавить в друзья
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/add-to-friends', { friendId: user.id });

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

export { UserList };
