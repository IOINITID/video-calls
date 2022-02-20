import { Box, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { Navigation } from 'core/components/navigation';
import { User } from 'core/components/user';
import { UserControl } from 'core/components/user-control';
import { theme } from 'core/theme';
// import { axiosInstance } from 'core/utils/axios-instance';
import { memo, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Friends = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [usersMessages, setUsersMessages] = useState<any[]>();

  useEffect(() => {
    // const getPersonalMessage = async () => {
    //   const response = await axiosInstance.post('/get-personal-messages-channels');
    //   setUsersMessages(response.data);
    // };
    // getPersonalMessage();
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '72px 376px 1fr',
        height: '100%',
        backgroundColor: theme.palette.common.white,
      }}
    >
      {/* Навигация */}
      <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
        <Navigation />
      </Box>
      {/* Личные сообщения*/}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '72px max-content 1fr 64px',
          backgroundColor: theme.palette.grey[400],
          overflow: 'hidden',
        }}
      >
        {/* Заголовок  */}
        <Box sx={{ padding: '24px 20px', borderBottom: `1px solid ${theme.palette.grey[600]}` }}>
          <Typography variant="h6">Личные сообщения</Typography>
        </Box>
        {/* Друзья */}
        <Box sx={{ padding: '16px' }}>
          <Button fullWidth variant="contained" onClick={() => navigate('/friends')}>
            Друзья
          </Button>
        </Box>
        {/* Список сообщений от пользователей */}
        <Box
          sx={{
            margin: '28px 4px',
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
          <Box sx={{ display: 'grid', rowGap: '12px', padding: '0 4px' }}>
            {usersMessages?.map((value: any) => {
              return (
                <User
                  key={value.userData._id}
                  id={value.userData._id}
                  name={value.userData.name}
                  status={value.userData.status}
                  email={value.userData.email}
                  channelId={value.value._id}
                />
              );
            })}
          </Box>
        </Box>
        {/* Управление пользователем */}
        <UserControl />
      </Box>
      {/* Блок друзья */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: '72px 1fr',
          backgroundColor: theme.palette.grey[500],
          overflow: 'hidden',
        }}
      >
        {/* Навигация по разделу друзья */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, max-content)',
            columnGap: '24px',
            padding: '16px 24px',
            borderBottom: `1px solid ${theme.palette.grey[400]}`,
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Друзья</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, max-content)',
              columnGap: '8px',
            }}
          >
            <Button
              variant={pathname.includes('all-friends') ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => navigate('all-friends')}
            >
              Все друзья
            </Button>
            <Button
              variant={pathname.includes('friends-online') ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => navigate('friends-online')}
            >
              В сети
            </Button>
            <Button
              variant={pathname.includes('friends-invites') ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => navigate('friends-invites')}
            >
              Заявки
            </Button>
            <Button
              variant={pathname.includes('friends-approvals') ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => navigate('friends-approvals')}
            >
              Ожидание
            </Button>
            <Button
              variant={pathname.includes('add-to-friends') ? 'contained' : 'outlined'}
              color="success"
              onClick={() => navigate('add-to-friends')}
            >
              Добавить в друзья
            </Button>
          </Box>
        </Box>
        {/* Содержимое вкладки */}
        <Outlet />
      </Box>
    </Box>
  );
};

export const FriendsMemoized = memo(Friends);
