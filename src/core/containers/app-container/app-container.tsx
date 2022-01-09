import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector, userIsAuthorizatedSelector } from '../../../modules/user/store/selectors';
import { setLogin } from '../../../modules/user/store/user';
import { AuthorizationResponse } from '../../types';
import { Box } from '@mui/material';
import { PublicRoutes } from '../../routes/public';
import { io } from 'socket.io-client';
import { PrivateRoutes } from '../../routes/private';
import { getUsers } from '../../services/get-users';
import { getFriends } from '../../services/get-friends';
import { getInvites } from '../../services/get-invites';
import { getApprovals } from '../../services/get-approvals';
import { API_URL } from '../../constants';

export const socket = io(API_URL, {
  transports: ['websocket'],
});

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const userId = useSelector(userIdSelector);

  const checkAuth = async () => {
    try {
      const response = await axios.get<AuthorizationResponse>(`${API_URL}/api/refresh`, {
        withCredentials: true,
      });

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);

        dispatch(
          setLogin({
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            token: response.data.accessToken,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
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
        dispatch(getFriends());
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-disconnect', () => {
        dispatch(getUsers());
        dispatch(getFriends());
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-add-invite-to-friends', () => {
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-add-to-friends', () => {
        dispatch(getFriends());
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-remove-from-friends', () => {
        dispatch(getFriends());
      });

      socket.on('on-remove-invite-to-friends', () => {
        dispatch(getInvites());
        dispatch(getApprovals());
      });

      socket.on('on-channel-join', (message) => {
        console.log('Message to channel:', message);
      });
    }
  }, [userId]);

  return (
    <Box
      sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'relative' }}
    >
      {isAuthorizated ? <PrivateRoutes /> : <PublicRoutes />}
    </Box>
  );
};

export { AppContainer };
