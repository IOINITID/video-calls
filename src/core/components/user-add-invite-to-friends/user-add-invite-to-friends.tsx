import { Avatar, Badge, Box, colors, Typography } from '@mui/material';
import { Dispatch, memo, SetStateAction } from 'react';
import { theme } from 'core/theme';
import { axiosInstance } from 'core/utils/axios-instance';
import { socket } from 'core/utils/socket';
import { Button } from 'core/components/button';

const UserAddInviteToFriends = ({
  id,
  name,
  status,
  image,
  setSearchValue,
}: {
  id: string;
  name: string;
  status: string;
  image: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'max-content 1fr',
          columnGap: '8px',
          alignItems: 'center',
          padding: '8px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
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
      >
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          color={status === 'online' ? 'success' : 'error'}
        >
          <Avatar sx={{ backgroundColor: colors.deepPurple[500] }} src={image} />
        </Badge>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content' }}>
          <Typography variant="body2">{name ? name : ''}</Typography>
          <Typography variant="caption">{status === 'online' ? 'В сети' : 'Не в сети'}</Typography>
        </Box>
      </Box>
      {/* Кнопки взаимодействия с пользователем */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(1, max-content)',
          columnGap: '24px',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            setSearchValue('');

            const response = await axiosInstance.post('/add-invite-to-friends', { friendId: id });

            socket.emit('on-add-invite-to-friends', id);

            return response.data;
          }}
        >
          Добавить в друзья
        </Button>
      </Box>
    </Box>
  );
};

export const UserAddInviteToFriendsMemoized = memo(UserAddInviteToFriends);
