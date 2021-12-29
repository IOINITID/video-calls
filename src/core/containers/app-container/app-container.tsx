import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userEmailSelector, userIdSelector, userIsAuthorizatedSelector } from '../../../modules/user/store/selectors';
import { setLogin, setLogout } from '../../../modules/user/store/user';
import { axiosInstance } from '../../services/axios-instance';
import { getLogout } from '../../services/get-logout';
import { AuthorizationResponse } from '../../types';
import { Box, Typography } from '@mui/material';
import { PublicRoutes } from '../../routes/public';
import { io } from 'socket.io-client';
import { theme } from '../../theme';

const socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

const AppContainer = () => {
  const dispatch = useDispatch();
  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const userEmail = useSelector(userEmailSelector);
  const userId = useSelector(userIdSelector);
  const [users, setUsers] = useState<{ _id: string; email: string; status: string }[]>([]);

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
    const response = await axiosInstance.get<{ _id: string; email: string; status: string }[]>('/users', {
      withCredentials: true,
    });

    setUsers(response.data);
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
    <Box sx={{ display: 'grid', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      {isAuthorizated ? (
        <div>
          <h1>{isAuthorizated ? `Пользователь авторизован ${userEmail}.` : 'Пользователь не авторизован.'}</h1>
          <button
            onClick={() => {
              getLogout();

              socket.emit('on-disconnect', userId);

              dispatch(setLogout());
            }}
          >
            Logout
          </button>
          <br />
          Пользователи:
          {users?.map((user) => {
            return (
              <div key={user._id}>
                <Box
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
                  <Typography>{user.email}</Typography>
                  <Typography>{user.status}</Typography>
                </Box>
              </div>
            );
          })}
        </div>
      ) : (
        <PublicRoutes />
      )}
    </Box>
  );
};

export { AppContainer };
