import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { App } from 'core/components/app';
import { requestRefreshAction } from 'modules/authorization/actions';
import { socket } from 'core/utils/socket';
import { requestGetUserAction } from 'modules/user/store';
import { RootState } from 'core/store/types';

const AppContainer = () => {
  const dispatch = useDispatch();

  const { authorizated } = useSelector((state: RootState) => state.authorization);
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      dispatch(requestRefreshAction());
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

  // useEffect(() => {
  //   if (userId) {
  //     socket.on('on-connect', () => {
  //       dispatch(getUsers());
  //       dispatch(getFriendsAction());
  //       dispatch(getInvites());
  //       dispatch(getApprovals());
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

  return <App isAuthorizated={authorizated} />;
};

export { AppContainer };
