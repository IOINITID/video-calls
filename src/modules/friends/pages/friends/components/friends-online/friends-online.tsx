import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { theme } from '../../../../../../core/theme';
import { memo } from 'react';
// import { userFriendsSelector } from '../../../../../user/store/selectors';
import { UserFriends } from '../../../../../../core/components/user-friends';
import { RootState } from 'core/store/types';

const FriendsOnline = () => {
  const { friends } = useSelector((state: RootState) => state.user);

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
      {friends.map((friend) => {
        return friend.status === 'online' ? (
          <UserFriends key={friend.id} id={friend.id} name={friend.name} status={friend.status} image={friend.image} />
        ) : null;
      })}
    </Box>
  );
};

export const FriendsOnlineMemoized = memo(FriendsOnline);
