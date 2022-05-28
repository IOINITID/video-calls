import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { App } from 'core/components/app';
import { socket } from 'core/utils/socket';
import { requestGetUserAction } from 'modules/user/store';
import { RootState } from 'core/store/types';
import { requestRefreshAction } from 'modules/authorization/store';

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

  useEffect(() => {
    if (authorizated) {
      dispatch(requestGetUserAction());

      socket.on('on-connect', () => {
        dispatch(requestGetUserAction());
      });
    }
  }, [authorizated]);

  useEffect(() => {
    if (user?.id) {
      socket.emit('on-connect', user.id);
    }
  }, [user?.id]);

  return <App isAuthorizated={authorizated} />;
};

export { AppContainer };
