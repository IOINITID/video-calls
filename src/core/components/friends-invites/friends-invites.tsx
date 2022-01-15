import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { theme } from '../../theme';
import { memo } from 'react';
import { userInvitesSelector } from '../../../modules/user/store/selectors';
import { UserFriends } from '../user-friends';

const FriendsInvites = () => {
  const invites = useSelector(userInvitesSelector);

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
      {invites.map((invite) => {
        return invite.status === 'online' ? (
          <UserFriends key={invite._id} name={invite.name} status={invite.status} />
        ) : null;
      })}
    </Box>
  );
};

export const FriendsInvitesMemoized = memo(FriendsInvites);
