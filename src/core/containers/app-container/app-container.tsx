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

export const socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const userId = useSelector(userIdSelector);

  const checkAuth = async () => {
    try {
      const response = await axios.get<AuthorizationResponse>('http://localhost:8080/api/refresh', {
        withCredentials: true,
      });

      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);

        dispatch(
          setLogin({ id: response.data.user.id, email: response.data.user.email, token: response.data.accessToken })
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
    if (userId) {
      socket.emit('on-connect', userId);

      socket.on('on-connect', () => {
        dispatch(getUsers());
        dispatch(getFriends());
      });

      socket.on('on-disconnect', () => {
        dispatch(getUsers());
        dispatch(getFriends());
      });

      socket.on('on-add-invite-to-friends', () => {
        dispatch(getInvites());
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
