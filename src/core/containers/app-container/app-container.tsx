import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { App } from 'core/components/app';
import { socket } from 'core/utils/socket';
import { requestGetUserAction } from 'modules/user/store';
import { RootState } from 'core/store/types';
import { requestRefreshAction } from 'modules/authorization/store';
import { Event } from 'core/constants';
import { ModalIncomingCall } from 'core/modals/modal-incoming-call';
import { Box } from '@mui/material';
import { User } from 'modules/user/services/types';

const AppContainer = () => {
  const dispatch = useDispatch();

  const { authorizated } = useSelector((state: RootState) => state.authorization);
  const { user } = useSelector((state: RootState) => state.user);

  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [callingUser, setIsCallignUser] = useState<User>();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        dispatch(requestRefreshAction({ refresh_token: refreshToken }));
      }
    }
  }, []);

  // const getPing = () => {
  //   const timestamp = Date.now();

  //   socket.emit('client:ping', timestamp);
  // };

  useEffect(() => {
    if (authorizated) {
      dispatch(requestGetUserAction());

      // const getPingInterval = setInterval(getPing, 5000);

      // socket.on('server:ping', (timestamp: number) => {
      //   console.log('PING:', Date.now() - timestamp + 'ms');
      // });

      socket.on(Event.Server.Connect, () => {
        dispatch(requestGetUserAction());
      });

      // NOTE: Событие входящего вызова от пользователя
      socket.on('server:meet_start_call', (payload: { userFromCall: User }) => {
        setIsIncomingCall(true);
        setIsCallignUser(payload.userFromCall);

        console.log(`LOGS: Входящий вызов от пользователя: ${payload.userFromCall.name}`);
      });

      // return () => {
      //   clearInterval(getPingInterval);
      // };
    }
  }, [authorizated]);

  useEffect(() => {
    if (user?.id) {
      socket.emit(Event.Client.Connect, user.id);

      const handleOnline = () => {
        socket.emit(Event.Client.Connect, user.id);

        console.log('Client status: online');
      };

      const handleOffline = () => {
        console.log('Client status: offline');
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }
  }, [user?.id]);

  return (
    <>
      <App isAuthorizated={authorizated} />;
      <ModalIncomingCall
        open={isIncomingCall}
        onClose={() => {
          setIsIncomingCall(false);
        }}
        user={callingUser}
      />
    </>
  );
};

export { AppContainer };
