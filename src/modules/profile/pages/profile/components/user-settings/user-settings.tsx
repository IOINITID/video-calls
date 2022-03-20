import { css } from '@emotion/css';
import { Box, Link, Typography } from '@mui/material';
import { theme } from 'core/theme';
import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserSettings = () => {
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
          display: grid;
          margin: 0;
          padding: 0;
          list-style: none;
          row-gap: 2px;
        `}
      >
        <li
          className={css`
            padding: 6px 10px !important;
            font-weight: 500 !important;
            font-size: 16px !important;
            line-height: 20px !important;
            background-color: ${location.pathname.includes('user-account') ? `${theme.palette.grey[400]}80` : 'none'};
            border-radius: 4px;
            cursor: pointer;

            &:hover,
            &:focus {
              background-color: ${theme.palette.grey[400]}80;
            }
          `}
        >
          <Link underline="none" onClick={() => navigate('user-account')}>
            <Typography
              className={css`
                color: ${theme.palette.grey[700]};
              `}
            >
              Моя учётная запись
            </Typography>
          </Link>
        </li>
        <li
          className={css`
            padding: 6px 10px !important;
            font-weight: 500 !important;
            font-size: 16px !important;
            line-height: 20px !important;
            background-color: ${location.pathname.includes('user-profile') ? `${theme.palette.grey[400]}80` : 'none'};
            border-radius: 4px;
            cursor: pointer;

            &:hover,
            &:focus {
              background-color: ${theme.palette.grey[400]}80;
            }
          `}
        >
          <Link underline="none" onClick={() => navigate('user-profile')}>
            <Typography
              className={css`
                color: ${theme.palette.grey[700]};
              `}
            >
              Профиль пользователя
            </Typography>
          </Link>
        </li>
      </ul>
    </Box>
  );
};

export const UserSettingsMemoized = memo(UserSettings);
