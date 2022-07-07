import { memo, useState } from 'react';
import { Avatar, Badge, Box, colors, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Chat, Call, MoreVert } from '@mui/icons-material';
import { theme } from 'core/theme';
import { useDispatch } from 'react-redux';
import { requestRemoveFromFriendsAction } from 'modules/friends/store';
import { useNavigate } from 'react-router-dom';
import { setMeetAction } from 'modules/meet/store';
import { User } from 'modules/user/services/types';

type UserFriendsProps = {
  user: User;
};

const UserFriends = ({ user: friend }: UserFriendsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          color={friend?.status && friend.status === 'online' ? 'success' : 'error'}
        >
          <Avatar sx={{ backgroundColor: colors.deepPurple[500] }} src={friend?.image ? friend.image : ''} />
        </Badge>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content' }}>
          <Typography variant="body2">{friend?.name ? friend.name : ''}</Typography>
          <Typography variant="caption">
            {friend?.status && friend.status === 'online' ? 'В сети' : 'Не в сети'}
          </Typography>
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
            dispatch(setMeetAction({ user: friend, isInitiator: true }));
            navigate('/meet');
            console.log('LOGS: Кнопка позвонить нажата.');
          }}
        >
          <Call />
        </IconButton>
        <IconButton
          sx={{ width: '32px', height: '32px' }}
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
            console.log('LOGS: Кнопка еще нажата.');
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
            dispatch(setMeetAction({ user: friend, isInitiator: true }));
            navigate('/meet');
            setAnchorEl(null);
            console.log('LOGS: Кнопка позвонить нажата.');
          }}
        >
          Позвонить
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(requestRemoveFromFriendsAction({ friend_id: friend.id }));
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
