import { memo } from 'react';
import { Avatar, colors, Badge, Box, Typography, IconButton } from '@mui/material';
import { theme } from 'core/theme';
import { DeleteOutline } from '@mui/icons-material';
import { socket } from 'core/utils/socket';
import { useSelector } from 'react-redux';
import { userUserSelector } from 'modules/user/store/selectors';
import { useNavigate } from 'react-router-dom';

type UserProps = {
  id: string;
  name: string;
  status: string;
  email: string;
};

const User = ({ name, status }: UserProps) => {
  const user = useSelector(userUserSelector);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr max-content',
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
        '.MuiBadge-badge': {
          border: `1px solid ${theme.palette.common.white}`,
        },
        '.MuiBadge-colorSuccess': {
          backgroundColor: theme.palette.success.light,
        },
        '.MuiBadge-colorError': {
          backgroundColor: theme.palette.error.light,
        },
      }}
      onClick={() => {
        // socket.emit('on-channel-join', channelId, user?.id);
        // navigate('/messages');
      }}
    >
      <Badge
        overlap="circular"
        variant="dot"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        color={status === 'online' ? 'success' : 'error'}
      >
        <Avatar sx={{ backgroundColor: colors.deepPurple[500] }} />
      </Badge>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content' }}>
        <Typography variant="body2">{name ? name : ''}</Typography>
        <Typography variant="caption">В сети</Typography>
      </Box>
      <Box className="delete-icon" sx={{ display: 'none' }}>
        <IconButton>
          <DeleteOutline sx={{ color: theme.palette.grey[700] }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export const UserMemoized = memo(User);
