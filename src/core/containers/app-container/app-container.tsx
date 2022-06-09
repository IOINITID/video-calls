import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { App } from 'core/components/app';
import { socket } from 'core/utils/socket';
import { requestGetUserAction } from 'modules/user/store';
import { RootState } from 'core/store/types';
import { requestRefreshAction } from 'modules/authorization/store';
import { Event } from 'core/constants';

const AppContainer = () => {
  const dispatch = useDispatch();

  const { authorizated } = useSelector((state: RootState) => state.authorization);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        dispatch(requestRefreshAction({ refresh_token: refreshToken }));
      }
    }
  }, []);

  const getPing = () => {
    const timestamp = Date.now();

    socket.emit('client:ping', timestamp);
  };

  useEffect(() => {
    if (authorizated) {
      dispatch(requestGetUserAction());

      const getPingInterval = setInterval(getPing, 5000);

      socket.on('server:ping', (timestamp: number) => {
        console.log('PING:', Date.now() - timestamp + 'ms');
      });

      socket.on(Event.Server.Connect, () => {
        dispatch(requestGetUserAction());
      });

      return () => {
        clearInterval(getPingInterval);
      };
    }
  }, [authorizated]);

  useEffect(() => {
    if (user?.id) {
      socket.emit(Event.Client.Connect, user.id);
    }
  }, [user?.id]);

  return <App isAuthorizated={authorizated} />;
};

export { AppContainer };
