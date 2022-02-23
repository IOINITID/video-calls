import { Box, Link, Typography } from '@mui/material';
import { theme } from 'core/theme';
import { useNavigate } from 'react-router-dom';

export const SettingNavigation = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
      <Typography>Настройки пользователя</Typography>
      <ul>
        <li>
          <Link underline="hover" onClick={() => navigate('/profile/account')}>
            <Typography>Моя учётная запись</Typography>
          </Link>
        </li>
        <li>
          <Link underline="hover" onClick={() => navigate('/profile/profile')}>
            <Typography>Профиль пользователя</Typography>
          </Link>
        </li>
      </ul>
    </Box>
  );
};
