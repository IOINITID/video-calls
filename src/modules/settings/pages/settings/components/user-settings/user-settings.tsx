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

  const userSettingsConfig = [
    {
      id: 1,
      title: 'Моя учётная запись',
      path: 'user-account',
      onClick: () => {
        navigate('user-account');
      },
      divider: false,
    },
    {
      id: 2,
      title: 'Профиль пользователя',
      path: 'user-profile',
      onClick: () => {
        navigate('user-profile');
      },
      divider: false,
    },
    {
      id: 3,
      title: 'Выйти',
      path: 'logout',
      onClick: () => {
        dispatch(postLogoutAction());
      },
      divider: true,
    },
  ];

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
      <Box
        component="ul"
        className={css`
          display: grid;
          margin: 0;
          padding: 0;
          list-style: none;
          row-gap: 2px;
        `}
      >
        {userSettingsConfig.map((value) => {
          return (
            <>
              {value.divider && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.25)', margin: '8px 10px' }} />}
              <Box
                key={value.id}
                component="li"
                className={css`
                  padding: 6px 10px !important;
                  font-weight: 500 !important;
                  font-size: 16px !important;
                  line-height: 20px !important;
                  background-color: ${location.pathname.includes(value.path) ? `#60656c` : 'none'};
                  border-radius: 4px;
                  cursor: pointer;

                  &:hover,
                  &:focus {
                    background-color: ${location.pathname.includes(value.path) ? '#565a61' : '#87888d'};

                    p {
                      color: #dfe0e1;
                    }
                  }
                `}
                onClick={value.onClick}
              >
                <Link underline="none">
                  <Typography sx={{ color: location.pathname.includes(value.path) ? '#ffffff' : '#a0a2a6' }}>
                    {value.title}
                  </Typography>
                </Link>
              </Box>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

export const UserSettingsMemoized = memo(UserSettings);
