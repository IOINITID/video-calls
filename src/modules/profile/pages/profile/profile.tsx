import { memo, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userUserSelector } from 'modules/user/store/selectors';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'core/components/navigation';
import { Button } from 'core/components/button';
import { postLogoutAction } from 'modules/user/store/actions';
import { socket } from 'core/utils/socket';
import { theme } from 'core/theme';
import { TextField } from 'core/components/text-field';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(userUserSelector);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', height: '100%' }}>
      <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
        <Navigation />
      </Box>
      <Box>
        <Typography variant="h5">Ваш email: {user?.email}</Typography>
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
        <Typography variant="h5">Ваше имя: {user?.name}</Typography>
        <TextField
          type="text"
          id="name"
          name="name"
          label="Имя пользователя"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Введите ваше имя"
          autoComplete="off"
          fullWidth
        />
        {/* TODO: Нужен пароль (скрытый или последние символы) */}
        <Typography variant="h5">Ваш пароль:</Typography>
        <TextField
          type="text"
          id="password"
          name="password"
          label="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Введите ваш пароль"
          autoComplete="off"
          fullWidth
        />
        {/* TODO: Нужен статус */}
        <Typography variant="h5">Статус:</Typography>
        {/* TODO: Нужна дата рождения */}
        <Typography variant="h5">Дата рождения:</Typography>
        {/* TODO: Нужен аватар */}
        <Typography variant="h5">Ваш аватар:</Typography>
        <Typography variant="h5">
          <Link sx={{ cursor: 'pointer' }} underline="hover" onClick={() => navigate(-1)}>
            Назад
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(postLogoutAction());

              socket.emit('on-disconnect', user?.id);
            }}
          >
            Выйти из аккаунта
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export const ProfileMemoized = memo(Profile);
