import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, TextField, InputAdornment, IconButton, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { theme } from 'core/theme';
import { useNavigate } from 'react-router-dom';
import { requestRegistrationAction } from 'modules/authorization/store';
import authorizationImage from 'core/assets/images/authorization-image.jpg';
import { AuthorizationLayout } from 'core/layouts/authorization-layout';
import { css } from '@linaria/core';
import { Button } from 'core/components/button';
import { Input } from 'core/components/input';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
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
            <Box sx={{ display: 'grid', rowGap: '24px' }}>
              <Box sx={{ display: 'grid', rowGap: '32px' }}>
                <Typography variant="h5">Создать учётную запись</Typography>
                <Box sx={{ display: 'grid', rowGap: '24px' }}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    // label="Адрес электронной почты"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Введите ваш email"
                    autoComplete="off"
                    // fullWidth
                  />
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    // label="Имя пользователя"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Введите ваше имя"
                    autoComplete="off"
                    // fullWidth
                  />
                  <Input
                    type={isShowPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    // label="Пароль"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Введите ваш пароль"
                    autoComplete="off"
                    // fullWidth
                    // InputProps={{
                    //   endAdornment: (
                    //     <InputAdornment position="end">
                    //       <IconButton onClick={() => setIsShowPassword(!isShowPassword)}>
                    //         {isShowPassword ? <VisibilityOff /> : <Visibility />}
                    //       </IconButton>
                    //     </InputAdornment>
                    //   ),
                    // }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'grid', rowGap: '32px' }}>
                <Typography variant="caption" color={theme.palette.grey[500]}>
                  Регистрируясь, Вы соглашаетесь с{' '}
                  <Link sx={{ cursor: 'pointer' }} underline="hover">
                    политикой обработки персональных данных
                  </Link>
                </Typography>
                <Button onClick={() => dispatch(requestRegistrationAction({ email, name, password }))}>
                  Зарегистрироваться
                </Button>
              </Box>
            </Box>
            <Typography variant="subtitle2">
              <Link
                sx={{ cursor: 'pointer' }}
                underline="hover"
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/authorization');
                }}
              >
                Уже зарегистрированы?
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </AuthorizationLayout>
  );
};

export const RegistrationMemoized = memo(Registration);
