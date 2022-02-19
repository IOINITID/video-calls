import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuthorizatedSelector, userUserSelector } from 'modules/user/store/selectors';
import { App } from 'core/components/app';
import { getAuthorizationRefreshAction, getUserAction } from 'modules/user/store/actions';
import { socket } from 'core/utils/socket';

const AppContainer = () => {
  const dispatch = useDispatch();

  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const user = useSelector(userUserSelector);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getAuthorizationRefreshAction());
    }
  }, []);

  useEffect(() => {
    if (isAuthorizated) {
      dispatch(getUserAction());

      socket.on('on-connect', () => {
        dispatch(getUserAction());
      });
    }
  }, [isAuthorizated]);

  useEffect(() => {
    if (user?.id) {
      socket.emit('on-connect', user.id);
    }
  }, [user?.id]);

  // useEffect(() => {
  //   // TODO: Запрашивать при изменении конкретных данных точечно

  // dispatch(serverLoadingAction());

  //   if (userId) {
  //     socket.emit('on-connect', userId);

  //     socket.on('on-connect', () => {
  //       dispatch(getUsers());
  //       dispatch(getFriendsAction());
  //       dispatch(getInvites());
  //       dispatch(getApprovals());

  //       dispatch(checkAuthorizationAction()); // Для повторного получения статуса пользователя при подключении
  //     });

  //     socket.on('on-disconnect', () => {
  //       dispatch(getUsers());
  //       dispatch(getFriendsAction());
  //       dispatch(getInvites());
  //       dispatch(getApprovals());
  //     });

  //     socket.on('on-add-invite-to-friends', () => {
  //       dispatch(getInvites());
  //       dispatch(getApprovals());
  //     });

  //     socket.on('on-add-to-friends', () => {
  //       dispatch(getFriendsAction());
  //       dispatch(getInvites());
  //       dispatch(getApprovals());
  //     });

  //     socket.on('on-remove-from-friends', () => {
  //       dispatch(getFriendsAction());
  //     });

  //     socket.on('on-remove-invite-to-friends', () => {
  //       dispatch(getInvites());
  //       dispatch(getApprovals());
  //     });
  //   }
  // }, [userId]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return <App isAuthorizated={isAuthorizated} />;
};

export { AppContainer };
