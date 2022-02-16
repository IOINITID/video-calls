import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector, userIsAuthorizatedSelector, userIsLoadingSelector } from 'modules/user/store/selectors';
import { getUsers } from 'core/services/get-users';
import { getInvites } from 'core/services/get-invites';
import { getApprovals } from 'core/services/get-approvals';
import { App } from 'core/components/app';
import { getAuthorizationRefreshAction, getServerStatusAction } from 'modules/user/store/actions';
import { getFriendsAction } from 'modules/friends/store/actions';
import { socket } from 'core/utils/socket';
import { Loader } from 'core/components/loader';

const AppContainer = () => {
  const dispatch = useDispatch();

  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const userId = useSelector(userIdSelector);
  const isLoading = useSelector(userIsLoadingSelector);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getAuthorizationRefreshAction());
    }
  }, []);

  useEffect(() => {
    dispatch(getServerStatusAction());
  }, []);

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
