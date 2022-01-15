import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { theme } from '../../theme';
import { memo } from 'react';
import { userFriendsSelector } from '../../../modules/user/store/selectors';
import { UserFriends } from '../user-friends';

const AllFriends = () => {
  const friends = useSelector(userFriendsSelector);

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
        <Typography variant="h6">Все друзья: {friends.length > 0 ? friends.length : 0}</Typography>
      </Box>
      <Box sx={{ display: 'grid', alignContent: 'start', rowGap: '8px' }}>
        {friends.map((friend) => {
          return <UserFriends key={friend._id} id={friend._id} name={friend.name} status={friend.status} />;
        })}
      </Box>
    </Box>
  );
};

export const AllFriendsMemoized = memo(AllFriends);
