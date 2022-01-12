import { memo } from 'react';
import { Avatar, colors, Badge, Box, Typography } from '@mui/material';

const User = ({ id, name, status }: { id: string; name: string; status: string; email: string }) => {
  // alt, src

  const [firstName, lastName] = name ? name.split(' ') : '';

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: '8px', alignItems: 'center' }}>
      <Badge
        overlap="circular"
        variant="dot"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        color={status === 'online' ? 'success' : 'error'}
      >
        <Avatar sx={{ backgroundColor: colors.deepPurple[500] }}>
          {firstName && firstName[0]}
          {lastName && lastName[0]}
        </Avatar>
      </Badge>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content' }}>
        <Typography>
          {name && name} <Typography component="span">{id && `#${id.slice(-4)}`}</Typography>
        </Typography>
      </Box>
    </Box>
  );
};

export const UserMemoized = memo(User);
