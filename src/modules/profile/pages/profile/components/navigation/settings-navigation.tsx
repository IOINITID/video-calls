import { css } from '@emotion/css';
import { Box, Link, Typography } from '@mui/material';
import { theme } from 'core/theme';
import { useLocation, useNavigate } from 'react-router-dom';

export const SettingNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ padding: '60px 8px', backgroundColor: theme.palette.grey[200] }}>
      <Typography
        className={css`
          padding: 6px 10px !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          line-height: 16px !important;
          text-transform: uppercase;
        `}
      >
        Настройки пользователя
      </Typography>
      <ul
        className={css`
          margin: 0;
          padding: 0;
          list-style: none;
        `}
      >
        <li
          className={css`
            padding: 6px 10px !important;
            font-weight: 500 !important;
            font-size: 16px !important;
            line-height: 20px !important;
            background-color: ${location.pathname.includes('/profile/account')
              ? `${theme.palette.grey[400]}80`
              : 'none'};
            cursor: pointer;

            &:hover,
            &:focus {
              background-color: ${theme.palette.grey[400]}80;
            }
          `}
        >
          <Link underline="none" onClick={() => navigate('/profile/account')}>
            <Typography>Моя учётная запись</Typography>
          </Link>
        </li>
        <li
          className={css`
            padding: 6px 10px !important;
            font-weight: 500 !important;
            font-size: 16px !important;
            line-height: 20px !important;
            background-color: ${location.pathname.includes('/profile/profile')
              ? `${theme.palette.grey[400]}80`
              : 'none'};
            cursor: pointer;

            &:hover,
            &:focus {
              background-color: ${theme.palette.grey[400]}80;
            }
          `}
        >
          <Link underline="none" onClick={() => navigate('/profile/profile')}>
            <Typography>Профиль пользователя</Typography>
          </Link>
        </li>
      </ul>
    </Box>
  );
};
