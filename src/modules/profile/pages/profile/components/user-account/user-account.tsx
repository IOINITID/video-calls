import { css } from '@emotion/css';
import { CancelOutlined } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { TextField } from 'core/components/text-field';
import { theme } from 'core/theme';
import { userUserSelector } from 'modules/user/store/selectors';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserAccount = () => {
  const navigate = useNavigate();

  const user = useSelector(userUserSelector);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        padding: '60px 40px 80px 40px',
        alignContent: 'start',
        backgroundColor: '#9e9e9e',
      }}
    >
      <Typography
        className={css`
          padding-bottom: 20px !important;
          font-weight: 600 !important;
          font-size: 20px !important;
          line-height: 24px !important;
        `}
      >
        Моя учетная запись
      </Typography>
      <Box
        sx={{
          display: 'grid',
          rowGap: '8px',
          position: 'absolute',
          top: '60px',
          right: '-40px',
          textAlign: 'center',
        }}
        onClick={() => navigate('friends')}
      >
        <CancelOutlined sx={{ width: '36px', height: '36px' }} />
        <Typography sx={{ fontSize: '13px' }}>ESC</Typography>
      </Box>
      {/* NOTE: Содержимое страницы */}
      <Box sx={{ display: 'grid' }}>
        {/* NOTE: Предупреждение для подтверждения почты */}
        <Box
          sx={{
            backgroundColor: theme.palette.grey[600],
            border: '1px solid #000000',
            borderRadius: '4px',
            padding: '20px',
          }}
        >
          <Box>{/* NOTE: Иконка предупреждения */}</Box>
          <Box>
            <Typography>Неподтвержденный адрес эл.почты</Typography>
            <Typography>
              Пожалуйста, проверьте свою электронную почту и следуйте инструкциям, чтобы подтвердить свой адресс
              электронной почты. Если вы не получили письмо или у него истек срок действия, вы можете попросить
              отправить новое.
            </Typography>
            <Button variant="contained">Отправить письмо с подтверждением еще раз</Button>
          </Box>
        </Box>
        {/* NOTE: Профиль пользователя */}
        <Box
          sx={{ margin: '20px 0', backgroundColor: theme.palette.grey[600], borderRadius: '4px', overflow: 'hidden' }}
        >
          <Box sx={{ position: 'relative', backgroundColor: user?.color, height: '100px' }}>
            {/* NOTE: Аватар пользователя */}
            <Box
              sx={{
                position: 'absolute',
                top: '76px',
                left: '16px',
                width: '94px',
                height: '94px',
                backgroundImage: user?.image ? `url(${user?.image})` : 'none',
                backgroundColor: user?.color ? user.color : 'none',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                border: `6px solid ${theme.palette.grey[900]}`,
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'max-content max-content',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 16px 16px 120px',
            }}
          >
            <Typography>
              {user?.name}#{user?.id.slice(-4)}
            </Typography>
            <Button variant="contained">Настр. профиль пользователя</Button>
          </Box>
          <Box
            sx={{
              display: 'grid',
              margin: '16px',
              padding: '16px',
              backgroundColor: theme.palette.grey[500],
              borderRadius: '4px',
            }}
          >
            {/* NOTE: Имя пользователя */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'max-content max-content',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
              }}
            >
              <Box>
                <Typography>Имя пользователя</Typography>
                <Typography>{user?.name}</Typography>
              </Box>
              <Button variant="contained">Изменить</Button>
            </Box>
            {/* NOTE: Электронная почта */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'max-content max-content',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
              }}
            >
              <Box>
                <Typography>Электронная почта</Typography>
                <Typography>{user?.name}</Typography>
              </Box>
              <Button variant="contained">Изменить</Button>
            </Box>
            {/* NOTE: Номер телефона */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'max-content max-content',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
              }}
            >
              <Box>
                <Typography>Номер телефона</Typography>
                <Typography>{user?.name}</Typography>
              </Box>
              <Button variant="contained">Изменить</Button>
            </Box>
            <Box sx={{ display: 'none' }}>
              {/* TODO: Поля ввода для добавления в модальное окно */}
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
              {/* TODO: Поля ввода для добавления в модальное окно */}
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
              {/* TODO: Поля ввода для добавления в модальное окно */}
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
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const UserAccountMemoized = memo(UserAccount);
