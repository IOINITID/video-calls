import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from '../../theme';
import { Navigation } from '../../components/navigation';
import { UserControl } from '../../components/user-control';
import { User } from '../../components/user';
import { Button } from '../../components/button';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const FriendsLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

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
          gridTemplateRows: '72px 1fr 64px',
          backgroundColor: theme.palette.grey[400],
          overflow: 'hidden',
        }}
      >
        {/* Заголовок  */}
        <Box sx={{ padding: '24px 20px', borderBottom: `1px solid ${theme.palette.grey[600]}` }}>
          <Typography variant="h6">Личные сообщения</Typography>
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
            {Array.from(Array(25).keys()).map((value) => {
              return <User key={value} id="1234" name="Имя Пользователя" status="online" email="userone@gmail.com" />;
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

export const FriendsLayoutMemoized = memo(FriendsLayout);
