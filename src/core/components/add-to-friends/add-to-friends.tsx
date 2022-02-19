import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { theme } from '../../theme';
import { memo, useState, useEffect } from 'react';
import { userUsersSelector } from '../../../modules/user/store/selectors';
import { TextField } from '../text-field';
import { postUsersAction } from '../../../modules/user/store/actions';
import { UserAddInviteToFriends } from '../user-add-invite-to-friends';

const AddToFriends = () => {
  const dispatch = useDispatch();

  const users = useSelector(userUsersSelector);

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (searchValue) {
      dispatch(postUsersAction({ searchValue }));
    }
  }, [searchValue]);

  return (
    <Box sx={{ padding: '0 8px 0 16px', margin: '16px 8px 16px 0' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Поиск по друзьям"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <Box
        sx={{
          padding: '0 8px 0 16px',
          margin: '16px 8px 16px 0',
          display: 'grid',
          alignContent: 'start',
          rowGap: '8px',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'none',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[300],
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: '8px',
          },
        }}
      >
        {users?.map((user) => {
          return (
            <UserAddInviteToFriends
              key={user.id}
              id={user.id}
              name={user.name}
              status={user.status}
              setSearchValue={setSearchValue}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export const AddToFriendsMemoized = memo(AddToFriends);
