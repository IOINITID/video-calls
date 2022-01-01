import { memo } from 'react';
import { Avatar, colors, Badge, Box, Typography } from '@mui/material';

const User = ({ name, status, email }: { name: string; status: string; email: string }) => {
  // alt, src

  const [firstName, lastName] = name.split(' ');

  return (
    <Box
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, max-content)', columnGap: '8px', alignItems: 'center' }}
    >
      <Badge
        overlap="circular"
        variant="dot"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        color={status === 'online' ? 'success' : 'error'}
      >
        <Avatar sx={{ backgroundColor: colors.deepPurple[500] }}>{firstName[0] + lastName[0]}</Avatar>
      </Badge>
      <Typography>{email}</Typography>
    </Box>
  );
};

export const UserMemoized = memo(User);
