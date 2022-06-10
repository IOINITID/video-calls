import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { theme } from 'core/theme';
import { memo, useState, useEffect } from 'react';
import { TextField } from 'core/components/text-field';
import { UserAddInviteToFriends } from 'core/components/user-add-invite-to-friends';
import { RootState } from 'core/store/types';
import { socket } from 'core/utils/socket';
import { Event } from 'core/constants';
import { Event as EventFriends } from 'modules/friends/constants';
import { Event as EventInvitations } from 'modules/invitations/constants';
import { requestGetFriendsUsersAction } from 'modules/friends/store';

const FriendsAdd = () => {
  const dispatch = useDispatch();

  const { friends_users } = useSelector((state: RootState) => state.friends);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue) {
      // dispatch(postUsersAction({ searchValue }));
    }
  }, [searchValue]);

  useEffect(() => {
    dispatch(requestGetFriendsUsersAction());

    socket.on(Event.Server.Connect, () => {
      dispatch(requestGetFriendsUsersAction());
    });

    socket.on(Event.Server.Disconnect, () => {
      dispatch(requestGetFriendsUsersAction());
    });

    socket.on(EventFriends.Server.AddToFriends, () => {
      dispatch(requestGetFriendsUsersAction());
    });

    socket.on(EventFriends.Server.RemoveFromFriends, () => {
      dispatch(requestGetFriendsUsersAction());
    });

    socket.on(EventInvitations.Server.DeclineInvitation, () => {
      dispatch(requestGetFriendsUsersAction());
    });

    socket.on(EventInvitations.Server.SentInvitation, () => {
      dispatch(requestGetFriendsUsersAction());
    });
  }, []);

  return (
    <Box sx={{ padding: '0 8px 0 16px', margin: '16px 8px 16px 0' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Поиск по друзьям"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
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
        {friends_users.map((friends_user) => {
          return (
            <UserAddInviteToFriends
              key={friends_user.id}
              id={friends_user.id}
              name={friends_user.name}
              status={friends_user.status}
              image={friends_user.image}
              sentInvitation={friends_user.sent_invitation}
              addToFriends={friends_user.add_to_friends}
              receivedInvitation={friends_user.received_invitation}
              setSearchValue={setSearchValue}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export const FriendsAddMemoized = memo(FriendsAdd);
