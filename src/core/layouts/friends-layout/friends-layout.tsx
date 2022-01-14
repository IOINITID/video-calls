import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { theme } from '../../theme';
import { Navigation } from '../../components/navigation';
import { UserControl } from '../../components/user-control';
import { User } from '../../components/user';

const FriendsLayout = () => {
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
        <Box sx={{ padding: '0 8px', margin: '28px 0', overflow: 'scroll' }}>
          <Box sx={{ display: 'grid', rowGap: '12px' }}>
            {Array.from(Array(25).keys()).map((value) => {
              return <User key={value} id="1234" name="Имя Пользователя" status="online" email="userone@gmail.com" />;
            })}
          </Box>
        </Box>
        {/* Управление пользователем */}
        <UserControl />
      </Box>
      {/* Блок друзья */}
      <Box sx={{ backgroundColor: theme.palette.grey[600] }}></Box>
    </Box>
  );
};

export const FriendsLayoutMemoized = memo(FriendsLayout);
