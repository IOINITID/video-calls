import { Box, Typography, Link } from '@mui/material';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { requestLogoutAction } from 'modules/authorization/store';
import {
  userApprovalsSelector,
  userFriendsSelector,
  userInvitesSelector,
  userUserSelector,
  userUsersSelector,
} from 'modules/user/store/selectors';
import { axiosInstance } from '../../utils/axios-instance';
import { theme } from '../../theme';
import { Button } from '../button';
import { User } from '../user';
import { socket } from '../../utils/socket';
import { RootState } from 'core/store/types';

const AllUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(userUsersSelector);
  const friends = useSelector(userFriendsSelector);
  const invites = useSelector(userInvitesSelector);
  const approvals = useSelector(userApprovalsSelector);
  const { authorizated } = useSelector((state: RootState) => state.authorization);
  const user = useSelector(userUserSelector);

  return (
    <Box sx={{ display: 'grid', rowGap: '16px', position: 'absolute', top: '0', left: '0', padding: '16px' }}>
      {/* Все пользователи */}
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
            <User id={user.id} name={user.name} status={user.status} email={user.email} />
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
              {/* <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/add-to-friends', { friendId: user._id });

                  return response.data;
                }}
              >
                Принять
              </Button> */}
              {/* <Button variant="contained" onClick={() => null}>
                Отклонить
              </Button> */}
            </Box>
          </Box>
        );
      })}
      {/* Все друзья */}
      <Typography variant="h5">Все друзья:</Typography>
      {friends?.map((friend) => {
        return (
          <Box
            key={friend.id}
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
            <User id={friend.id} name={friend.name} status={friend.status} email={friend.email} />
            <Box sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: '16px' }}>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/remove-from-friends', { friendId: friend.id });

                  socket.emit('on-remove-from-friends', friend.id); // Отправка события пользователю, которого удаляют из друзей

                  return response.data;
                }}
              >
                Удалить
              </Button>
            </Box>
          </Box>
        );
      })}
      {/* Запросы в друзья */}
      <Typography variant="h5">Запросы в друзья:</Typography>
      {invites?.map((invite) => {
        return (
          <Box
            key={invite.id}
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
            <User id={invite.id} name={invite.name} status={invite.status} email={invite.email} />
            <Box sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: '16px' }}>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/add-to-friends', { friendId: invite.id });

                  socket.emit('on-add-to-friends', invite.id); // Отправка события пользователю, который ждет принятие приглашения

                  return response.data;
                }}
              >
                Принять
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/remove-invite-to-friends', { friendId: invite.id });

                  socket.emit('on-remove-invite-to-friends', invite.id); // Отправка события пользователю, который ждет принятия или отклонения приглашения

                  return response.data;

                  // TODO: Добавить отклонение приглашения
                }}
              >
                Отклонить
              </Button>
            </Box>
          </Box>
        );
      })}
      {/* Ожидание добавления в друзья */}
      <Typography variant="h5">Ожидание добавления в друзья:</Typography>
      {approvals?.map((approval) => {
        return (
          <Box
            key={approval.id}
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
            <User id={approval.id} name={approval.name} status={approval.status} email={approval.email} />
            <Box sx={{ display: 'grid', gridAutoFlow: 'column', alignItems: 'center', columnGap: '16px' }}>
              <Typography>Ожидает подтверждения</Typography>
              <Button
                variant="contained"
                onClick={async () => {
                  const response = await axiosInstance.post('/remove-invite-to-friends', { friendId: approval.id });

                  socket.emit('on-remove-invite-to-friends', approval.id); // Отправка события пользователю, который ожидает принятия или отклонения приглашения в друзья

                  return response.data;

                  // TODO: Добавить отклонение приглашения
                }}
              >
                Отклонить
              </Button>
            </Box>
          </Box>
        );
      })}
      {/* Выйти из аккаунта */}
      <Box sx={{ display: 'grid', rowGap: '8px' }}>
        <Typography variant="h5">
          {authorizated ? `Пользователь авторизован: ${user?.email}.` : 'Пользователь не авторизован.'}
        </Typography>
        <Typography variant="h5">
          <Link sx={{ cursor: 'pointer' }} underline="hover" onClick={() => navigate('/settings')}>
            Посмотреть профиль
          </Link>
        </Typography>
        <Typography variant="h5">
          <Link sx={{ cursor: 'pointer' }} underline="hover" onClick={() => navigate('/channels')}>
            Каналы
          </Link>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(requestLogoutAction());

            socket.emit('on-disconnect', user?.id);
          }}
        >
          Выйти из аккаунта
        </Button>
      </Box>
    </Box>
  );
};

export const AllUsersMemoized = memo(AllUsers);
