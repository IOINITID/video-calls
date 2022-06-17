import { memo, useState } from 'react';
import { Avatar, Badge, Box, colors, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Chat, Call, MoreVert } from '@mui/icons-material';
import { theme } from 'core/theme';
import { useDispatch, useSelector } from 'react-redux';
import { requestRemoveFromFriendsAction } from 'modules/friends/store';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'core/store/types';

type UserFriendsProps = {
  id: string;
  name: string;
  status: string;
  image: string;
};

const UserFriends = ({ id, name, status, image }: UserFriendsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: RootState) => state.user);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

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
          gridTemplateColumns: 'repeat(3, 24px)',
          columnGap: '24px',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <IconButton
          sx={{ width: '32px', height: '32px' }}
          onClick={() => {
            console.log('LOGS: Chat button pressed');
          }}
        >
          <Chat />
        </IconButton>
        <IconButton
          sx={{ width: '32px', height: '32px' }}
          onClick={() => {
            if (user?.id) {
              navigate(`/meet/${id}`);
              console.log('LOGS: Call button pressed');
            }
          }}
        >
          <Call />
        </IconButton>
        <IconButton
          sx={{ width: '32px', height: '32px' }}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            console.log('LOGS: More button pressed');
          }}
        >
          <MoreVert />
        </IconButton>
      </Box>
      {/* NOTE: Меню действий для пользователя который находится в друзьях */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
          }}
        >
          Написать
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (user?.id) {
              navigate(`/meet/${id}`);
              console.log('LOGS: Call button pressed');
            }

            setAnchorEl(null);
          }}
        >
          Позвонить
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(requestRemoveFromFriendsAction({ friend_id: id }));
            setAnchorEl(null);
          }}
        >
          Удалить из друзей
        </MenuItem>
      </Menu>
    </Box>
  );
};

export const UserFriendsMemoized = memo(UserFriends);
