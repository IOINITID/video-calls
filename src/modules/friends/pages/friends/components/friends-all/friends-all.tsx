import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { theme } from 'core/theme';
import { memo, useEffect } from 'react';
import { UserFriends } from 'core/components/user-friends';
import { RootState } from 'core/store/types';
import { socket } from 'core/utils/socket';
import { requestGetFriendsAction } from 'modules/friends/store';
import { Event as EventFriends } from 'modules/friends/constants';
import { Event } from 'core/constants';

const FriendsAll = () => {
  const dispatch = useDispatch();

  const { friends } = useSelector((state: RootState) => state.friends);

  useEffect(() => {
    dispatch(requestGetFriendsAction());

    // NOTE: Объединение событий для обновления списка друзей
    // socket.on(
    //   Event.Server.Connect ||
    //     Event.Server.Disconnect ||
    //     EventFriends.Server.AddToFriends ||
    //     EventFriends.Server.RemoveFromFriends,
    //   () => {
    //     dispatch(requestGetFriendsAction());
    //   }
    // );

    socket.on(Event.Server.Connect, () => {
      dispatch(requestGetFriendsAction());
    });

    socket.on(Event.Server.Disconnect, () => {
      dispatch(requestGetFriendsAction());
    });

    socket.on(EventFriends.Server.AddToFriends, () => {
      dispatch(requestGetFriendsAction());
    });

    socket.on(EventFriends.Server.RemoveFromFriends, () => {
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
        <Typography variant="h6">Всего друзей: {friends && friends?.length > 0 ? friends?.length : 0}</Typography>
      </Box>
      <Box sx={{ display: 'grid', alignContent: 'start', rowGap: '8px' }}>
        {friends.map((friend) => {
          return <UserFriends key={friend.id} user={friend} />;
        })}
      </Box>
    </Box>
  );
};

export const FriendsAllMemoized = memo(FriendsAll);
