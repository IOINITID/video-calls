import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../../core/components/button';
import { TextField } from '../../../../core/components/text-field';
import { registration } from '../../../registration/services';
import { setLogin } from '../../../user/store/user';
import { authorization } from '../../services';
import { Box } from '@mui/material';

const Authorization = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box sx={{ display: 'grid', rowGap: '16px', padding: '24px' }}>
      <TextField
        type="email"
        id="email"
        name="email"
        label="Логин"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Введите ваш email"
        autoComplete="off"
      />
      <TextField
        type="password"
        id="password"
        name="password"
        label="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Введите ваш пароль"
        autoComplete="off"
      />
      <Box sx={{ display: 'grid', gridAutoFlow: 'column', columnGap: '16px' }}>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              const response = await authorization(email, password);

              localStorage.setItem('token', response.data.accessToken);

              dispatch(
                setLogin({
                  id: response.data.user.id,
                  email: response.data.user.email,
                  token: response.data.accessToken,
                })
              );
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Авторизоваться
        </Button>
        <Button
          variant="contained"
          onClick={async () => {
            try {
              const response = await registration(email, password);

              localStorage.setItem('token', response.data.accessToken);

              dispatch(
                setLogin({
                  id: response.data.user.id,
                  email: response.data.user.email,
                  token: response.data.accessToken,
                })
              );
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Box>
  );
};

export const AuthorizationMemoized = memo(Authorization);
