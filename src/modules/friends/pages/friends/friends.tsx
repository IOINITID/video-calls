import { memo } from 'react';
import { Box } from '@mui/material';
import { AllUsers } from '../../../../core/components/all-users';

const Friends = () => {
  return (
    <Box>
      {/* <UserList /> */}
      {/* <FriendsList /> */}
      <AllUsers />
    </Box>
  );
};

export const FriendsMemoized = memo(Friends);
