import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector, userIsAuthorizatedSelector } from '../../../modules/user/store/selectors';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';
import { getUsers } from '../../services/get-users';
import { getInvites } from '../../services/get-invites';
import { getApprovals } from '../../services/get-approvals';
import { API_URL } from '../../constants';
import { App } from '../../components/app';
import { checkAuthorizationAction } from '../../../modules/user/store/actions';
import { getFriendsAction } from '../../../modules/friends/store/actions';

export const socket = io(API_URL, {
  transports: ['websocket'],
});

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuthorizationAction());
    }
  }, []);

  useEffect(() => {
    // TODO: Запрашивать при изменении конкретных данных точечно
    // dispatch(getUsers());
    // dispatch(getInvites());
    // dispatch(getFriends());

    if (userId) {
      socket.emit('on-connect', userId);

      socket.on('on-connect', () => {
        dispatch(getUsers());
        dispatch(getFriendsAction());
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-disconnect', () => {
        dispatch(getUsers());
        dispatch(getFriendsAction());
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-add-invite-to-friends', () => {
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-add-to-friends', () => {
        dispatch(getFriendsAction());
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-remove-from-friends', () => {
        dispatch(getFriendsAction());
      });

      socket.on('on-remove-invite-to-friends', () => {
        dispatch(getInvites());
        dispatch(getApprovals());
      });
    }
  }, [userId]);

  return (
    <Box
      sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'relative' }}
    >
      <App isAuthorizated={isAuthorizated} />

      {/* Модальное окно при входящем вызове */}
      {/* TODO: Доделать вызов во всем приложении а не только на странице каналы */}
      {/* <Modal open={isIncomingCall}>
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            columnGap: '16px',
            padding: '32px',
            backgroundColor: theme.palette.common.white,
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate('/channels');
            }}
          >
            Принять
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              navigate('/');
            }}
          >
            Отклонить
          </Button>
        </Box>
      </Modal> */}
    </Box>
  );
};

export { AppContainer };
