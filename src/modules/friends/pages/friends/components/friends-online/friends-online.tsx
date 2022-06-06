import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { theme } from 'core/theme';
import { memo, useEffect } from 'react';
import { UserFriends } from 'core/components/user-friends';
import { RootState } from 'core/store/types';
import { requestGetFriendsAction } from 'modules/friends/store';
import { socket } from 'core/utils/socket';
import { Event } from 'modules/friends/pages/constants';

const FriendsOnline = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state: RootState) => state.friends);

  useEffect(() => {
    dispatch(requestGetFriendsAction());

    socket.on('on-connect', () => {
      dispatch(requestGetFriendsAction());
    });

    socket.on(Event.Server.AddToFriends, () => {
      dispatch(requestGetFriendsAction());
    });

    socket.on('on-disconnect', () => {
      dispatch(requestGetFriendsAction());
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
        <Typography variant="h6">
          В сети: {friends && friends.length > 0 ? friends.filter((friend) => friend.status === 'online').length : 0}
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', alignContent: 'start', rowGap: '8px' }}>
        {friends.map((friend) => {
          return friend.status === 'online' ? (
            <UserFriends
              key={friend.id}
              id={friend.id}
              name={friend.name}
              status={friend.status}
              image={friend.image}
            />
          ) : null;
        })}
      </Box>
    </Box>
  );
};

export const FriendsOnlineMemoized = memo(FriendsOnline);
