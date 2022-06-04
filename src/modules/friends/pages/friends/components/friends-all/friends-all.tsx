import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { theme } from '../../../../../../core/theme';
import { memo, useEffect } from 'react';
import { UserFriends } from '../../../../../../core/components/user-friends';
import { RootState } from 'core/store/types';
import { requestGetUsersAction } from 'modules/user/store';
import { socket } from 'core/utils/socket';

const FriendsAll = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(requestGetUsersAction());

    socket.on('on-connect', () => {
      dispatch(requestGetUsersAction());
    });

    socket.on('on-disconnect', () => {
      dispatch(requestGetUsersAction());
    });
  }, []);

  return (
    <Box
      sx={{
        padding: '0 8px 0 16px',
        margin: '16px 8px 16px 0',
        display: 'grid',
        alignContent: 'start',
        rowGap: '8px',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'none',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.grey[300],
          border: `1px solid ${theme.palette.grey[500]}`,
          borderRadius: '8px',
        },
      }}
    >
      <Box sx={{ padding: '8px 12px' }}>
        <Typography variant="h6">Все пользователи: {users && users?.length > 0 ? users?.length : 0}</Typography>
      </Box>
      <Box sx={{ display: 'grid', alignContent: 'start', rowGap: '8px' }}>
        {users?.map((user) => {
          return <UserFriends key={user.id} id={user.id} name={user.name} status={user.status} image={user.image} />;
        })}
      </Box>
    </Box>
  );
};

export const FriendsAllMemoized = memo(FriendsAll);
