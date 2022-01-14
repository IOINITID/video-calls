import { memo } from 'react';
import { Avatar, colors, Badge, Box, Typography } from '@mui/material';
import { theme } from '../../theme';
import { DeleteOutline } from '@mui/icons-material';

const User = ({ name, status }: { id: string; name: string; status: string; email: string }) => {
  const [firstName, lastName] = name ? name.split(' ') : '';

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr 24px',
        columnGap: '8px',
        alignItems: 'center',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: theme.palette.grey[300],
          '.delete-icon': {
            display: 'grid',
          },
        },
      }}
    >
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
        <Typography variant="body2">{name ? name : ''}</Typography>
        <Typography variant="caption">В сети</Typography>
      </Box>
      <Box className="delete-icon" sx={{ display: 'none' }}>
        <DeleteOutline sx={{ color: theme.palette.grey[700] }} />
      </Box>
    </Box>
  );
};

export const UserMemoized = memo(User);
