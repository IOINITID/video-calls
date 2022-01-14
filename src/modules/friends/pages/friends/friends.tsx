import { memo } from 'react';
import { Box } from '@mui/material';
import { AllUsers } from '../../../../core/components/all-users';
import { Navigation } from '../../../../core/components/navigation';
import { FriendsLayout } from '../../../../core/layouts/friends-layout';

const Friends = () => {
  return (
    <FriendsLayout />
    // <Box
    //   sx={{
    //     position: 'fixed',
    //     top: '0',
    //     left: '0',
    //     display: 'grid',
    //     gridTemplateColumns: 'max-content 1fr',
    //     width: '100%',
    //     height: '100%',
    //     alignContent: 'start',
    //   }}
    // >
    //   <Navigation />
    //   {/* <UserList /> */}
    //   {/* <FriendsList /> */}
    //   <Box sx={{ position: 'relative' }}>
    //     <AllUsers />
    //   </Box>
    // </Box>
  );
};

export const FriendsMemoized = memo(Friends);
