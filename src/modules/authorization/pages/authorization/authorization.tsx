import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from 'core/components/text-field';
import { Box, InputAdornment, IconButton, Typography, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { theme } from 'core/theme';
import { useNavigate } from 'react-router-dom';
import authorizationImage from 'core/assets/images/authorization-image.jpg';
import { AuthorizationLayout } from 'core/layouts/authorization-layout';
import { css } from '@emotion/css';
import { LoadingButton } from '@mui/lab';
import { RootState } from 'core/store/types';
import { requestAuthorizationAction } from 'modules/authorization/store';

const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state: RootState) => state.authorization);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <AuthorizationLayout>
      <Box
        sx={{
          display: 'grid',
          width: '920px',
          gridTemplateColumns: '448px 472px',
          borderRadius: '20px',
          border: `1px solid ${theme.palette.grey[300]}`,
          overflow: 'hidden',
        }}
      >
        <Box>
          <img
            className={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
            `}
            src={authorizationImage}
            alt="Илюстрация."
          />
        </Box>
        <Box sx={{ padding: '48px 56px', backgroundColor: `${theme.palette.common.white}` }}>
          <Box sx={{ display: 'grid', rowGap: '16px' }}>
            <Box sx={{ display: 'grid', rowGap: '32px' }}>
              <Box sx={{ display: 'grid', rowGap: '32px' }}>
                <Typography variant="h5">Войти в свой профиль</Typography>
                <Box sx={{ display: 'grid', rowGap: '24px' }}>
                  <TextField
                    type="email"
                    id="email"
                    name="email"
                    label="Адрес электронной почты"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Введите ваш email"
                    autoComplete="off"
                    fullWidth
                  />
                  <TextField
                    type={isShowPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    label="Пароль"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Введите ваш пароль"
                    autoComplete="off"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>
              <LoadingButton
                disableElevation
                disableRipple
                sx={{ pdding: '8px 16px', textTransform: 'initial' }}
                variant="contained"
                color="primary"
                size="large"
                loading={loading.access_token || loading.refresh_token}
                onClick={() => {
                  dispatch(requestAuthorizationAction({ email, password }));
                }}
              >
                Войти
              </LoadingButton>
            </Box>
            <Typography variant="subtitle2">
              У Вас ещё нет профиля?{' '}
              <Link
                sx={{ cursor: 'pointer' }}
                underline="hover"
                onClick={(event) => {
                  event.preventDefault();

                  navigate('/registration');
                }}
              >
                Зарегистрироваться
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthorizationLayout>
  );
};

export const AuthorizationMemoized = memo(Authorization);
