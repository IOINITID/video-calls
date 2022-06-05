import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { theme } from 'core/theme';
import { memo, useEffect } from 'react';
import { UserAddToFriends } from 'core/components/user-add-to-friends';
import { RootState } from 'core/store/types';
import { requestGetInvitationsAction } from 'modules/invitations/store';
import { socket } from 'core/utils/socket';

const FriendsInvitations = () => {
  const dispatch = useDispatch();

  const { invitations } = useSelector((state: RootState) => state.invitations);

  useEffect(() => {
    dispatch(requestGetInvitationsAction());

    socket.on('on-connect', () => {
      dispatch(requestGetInvitationsAction());
    });

    socket.on('on-disconnect', () => {
      dispatch(requestGetInvitationsAction());
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
          Ожидают добавления в друзья:{' '}
          {invitations.received && invitations.received.length > 0 ? invitations.received.length : 0}
        </Typography>
      </Box>
      <Box sx={{ display: 'grid', alignContent: 'start', rowGap: '8px' }}>
        {invitations.received.map((invitation) => {
          return (
            <UserAddToFriends
              key={invitation.id}
              id={invitation.id}
              name={invitation.name}
              status={invitation.status}
              image={invitation.image}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export const FriendsInvitationsMemoized = memo(FriendsInvitations);
