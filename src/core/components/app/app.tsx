import { useEffect, useState } from 'react';
import { PrivateRoutes, PublicRoutes } from 'core/routes';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'core/store/types';
import { User } from 'modules/user/services/types';
import { requestRefreshAction } from 'modules/authorization/store';
import { requestGetUserAction } from 'modules/user/store';
import { socket } from 'core/utils/socket';
import { Event } from 'core/constants';
import { ModalIncomingCall } from 'core/modals/modal-incoming-call';
import { Portal } from '../portal';
import { MediaSettingsModal } from 'core/modals/media-settings-modal';
import { Button } from '../button';
import { css } from '@linaria/core';

const App = () => {
  const dispatch = useDispatch();

  const { authorizated } = useSelector((state: RootState) => state.authorization);
  const { user } = useSelector((state: RootState) => state.user);

  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [callingUser, setIsCallignUser] = useState<User | null>(null);
  const [isMediaSettingsModal, setIsMediaSettingsModal] = useState(false);

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

      // NOTE: Событие отклонения входящего вызова от пользователя
      socket.on('server:meet_end_call', () => {
        setIsIncomingCall(false);

        console.log('LOGS: Входящий вызов от пользователя отклонен.');
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
      {authorizated ? <PrivateRoutes /> : <PublicRoutes />}
      <Button
        className={css`
          position: fixed;
          top: 32px;
          right: 32px;
        `}
        onClick={() => setIsMediaSettingsModal(true)}
      >
        Настройки
      </Button>
      <ModalIncomingCall open={isIncomingCall} onClose={() => setIsIncomingCall(false)} user={callingUser} />
      <Portal>
        {isMediaSettingsModal ? (
          <MediaSettingsModal isOpen={isMediaSettingsModal} onClose={() => setIsMediaSettingsModal(false)} />
        ) : null}
      </Portal>
    </>
  );
};

export { App };
