import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../core/components/button';
import { TextField } from '../../../../core/components/text-field';
import { setLogin } from '../../../user/store/user';
import { authorization } from '../../services';
import { Box, InputAdornment, IconButton, Typography, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import authorizationImage from '../../../../core/assets/authorization-image.jpg';
import { theme } from '../../../../core/theme';
import { useNavigate } from 'react-router-dom';

const Authorization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const getLogin = async () => {
    try {
      const response = await authorization(email, password);

      localStorage.setItem('token', response.data.accessToken);

      dispatch(
        setLogin({
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          token: response.data.accessToken,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        <img style={{ width: '100%',
    height: '100%',
    objectFit: 'cover' }} src={authorizationImage} alt="Илюстрация." />
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
                  label="Логин"
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
            <Button variant="contained" color="primary" size="large" onClick={getLogin}>
              Войти
            </Button>
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
  );
};

export const AuthorizationMemoized = memo(Authorization);
