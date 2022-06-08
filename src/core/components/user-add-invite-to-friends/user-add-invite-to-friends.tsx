import { Avatar, Badge, Box, colors, Typography } from '@mui/material';
import { Dispatch, memo, SetStateAction } from 'react';
import { theme } from 'core/theme';
import { Button } from 'core/components/button';
import { useDispatch, useSelector } from 'react-redux';
import { requestSentInvitationsAction } from 'modules/invitations/store';
import { RootState } from 'core/store/types';

type UserAddInviteToFriends = {
  id: string;
  name: string;
  status: string;
  image: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

const UserAddInviteToFriends = ({ id, name, status, image, setSearchValue }: UserAddInviteToFriends) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);

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
          onClick={() => {
            dispatch(requestSentInvitationsAction({ friend_id: id }));
            // setSearchValue('');
          }}
        >
          Добавить в друзья
        </Button>
      </Box>
    </Box>
  );
};

export const UserAddInviteToFriendsMemoized = memo(UserAddInviteToFriends);
