import { memo } from 'react';
import { Box } from '@mui/material';
import { UserList } from '../../../../core/components/user-list';
import { Button } from '../../../../core/components/button';
import { useDispatch, useSelector } from 'react-redux';
import { userEmailSelector, userIdSelector, userIsAuthorizatedSelector } from '../../../user/store/selectors';
import { getLogout } from '../../../../core/services/get-logout';
import { setLogout } from '../../../user/store/user';
import { socket } from '../../../../core/containers/app-container/app-container';
import { FriendsList } from '../../../../core/components/friends-list';
import { AllUsers } from '../../../../core/components/all-users';

const Friends = () => {
  const dispatch = useDispatch();
  const isAuthorizated = useSelector(userIsAuthorizatedSelector);
  const userEmail = useSelector(userEmailSelector);
  const userId = useSelector(userIdSelector);

  return (
    <Box>
      {/* <UserList /> */}
      {/* <FriendsList /> */}
      <AllUsers />
      <div>
        <h1>{isAuthorizated ? `Пользователь авторизован ${userEmail}.` : 'Пользователь не авторизован.'}</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            getLogout();
            socket.emit('on-disconnect', userId);
            dispatch(setLogout());
          }}
        >
          Выйти
        </Button>
      </div>
    </Box>
  );
};

export const FriendsMemoized = memo(Friends);
