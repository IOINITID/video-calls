import { useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import { theme } from '../../theme';
import { memo } from 'react';
import { userFriendsSelector } from '../../../modules/user/store/selectors';

const FriendsList = () => {
  const friends = useSelector(userFriendsSelector);

  return (
    <Box sx={{ display: 'grid', rowGap: '8px', position: 'absolute', top: '0', right: '0', padding: '16px' }}>
      <Typography variant="h5">Все друзья:</Typography>
      {friends?.map((friend) => {
        return (
          <Box
            key={friend._id}
            sx={{
              display: 'inline-grid',
              gridAutoFlow: 'column',
              columnGap: '16px',
              backgroundColor: theme.palette.common.white,
              borderRadius: '8px',
              border: `1px solid ${theme.palette.grey[300]}`,
              padding: '8px 16px',
            }}
          >
            <Typography>{friend.email}</Typography>
            <Typography>{friend.status}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export const FriendsListMemoized = memo(FriendsList);
