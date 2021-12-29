import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector, userIsAuthorizatedSelector } from '../../../modules/user/store/selectors';
import { setLogin, setUsers } from '../../../modules/user/store/user';
import { axiosInstance } from '../../services/axios-instance';
import { AuthorizationResponse } from '../../types';
import { Box } from '@mui/material';
import { PublicRoutes } from '../../routes/public';
import { io } from 'socket.io-client';
import { UserResponse } from '../../../modules/user/store/types';
import { PrivateRoutes } from '../../routes/private';

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

  const getUsers = async () => {
    const response = await axiosInstance.get<UserResponse[]>('/users');

    dispatch(setUsers(response.data));
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
        getUsers();
      });

      socket.on('on-disconnect', () => {
        getUsers();
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
