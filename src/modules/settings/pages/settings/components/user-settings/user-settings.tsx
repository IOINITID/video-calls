import { css } from '@emotion/css';
import { Box, Divider, Link, Typography } from '@mui/material';
import { postLogoutAction } from 'modules/user/store/actions';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const UserSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <Box sx={{ padding: '60px 8px', backgroundColor: '#43454a' }}>
      <Typography
        className={css`
          padding: 6px 10px !important;
          font-weight: 700 !important;
          font-size: 12px !important;
          line-height: 16px !important;
          color: #a0a2a6;
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
            background-color: ${location.pathname.includes('user-account') ? `#60656c` : 'none'};
            border-radius: 4px;
            cursor: pointer;

            &:hover,
            &:focus {
              background-color: ${location.pathname.includes('user-account') ? '#565a61' : '#87888d'};
            }
          `}
        >
          <Link underline="none" onClick={() => navigate('user-account')}>
            <Typography
              className={css`
                color: ${location.pathname.includes('user-account') ? '#ffffff' : '#a0a2a6'};

                &:hover,
                &:focus {
                  color: #dfe0e1;
                }
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
            background-color: ${location.pathname.includes('user-profile') ? `#60656c` : 'none'};
            border-radius: 4px;
            cursor: pointer;

            &:hover,
            &:focus {
              background-color: ${location.pathname.includes('user-profile') ? '#565a61' : '#87888d'};
            }
          `}
        >
          <Link underline="none" onClick={() => navigate('user-profile')}>
            <Typography
              className={css`
                color: ${location.pathname.includes('user-profile') ? '#ffffff' : '#a0a2a6'};

                &:hover,
                &:focus {
                  color: #dfe0e1;
                }
              `}
            >
              Профиль пользователя
            </Typography>
          </Link>
        </li>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.25)', margin: '8px 10px' }} />
        <li
          className={css`
            padding: 6px 10px !important;
            font-weight: 500 !important;
            font-size: 16px !important;
            line-height: 20px !important;
            background-color: ${location.pathname.includes('logout') ? `#60656c` : 'none'};
            border-radius: 4px;
            cursor: pointer;

            &:hover,
            &:focus {
              background-color: ${location.pathname.includes('logout') ? '#565a61' : '#87888d'};
            }
          `}
        >
          <Link underline="none" onClick={() => dispatch(postLogoutAction())}>
            <Typography
              className={css`
                color: ${location.pathname.includes('logout') ? '#ffffff' : '#a0a2a6'};

                &:hover,
                &:focus {
                  color: #dfe0e1;
                }
              `}
            >
              Выйти
            </Typography>
          </Link>
        </li>
      </ul>
    </Box>
  );
};

export const UserSettingsMemoized = memo(UserSettings);
