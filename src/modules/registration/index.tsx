import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { Input } from 'core/components/input';
import authorizationImage from 'core/assets/images/authorization-image.jpg';

export const Registration = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: 448px 472px;
        width: 920px;
        overflow: hidden;
        border: 1px solid #fefefe;
        border-radius: 20px;
      `}
    >
      <div>
        <img
          className={css`
            width: 100%;
            height: 100%;
            object-fit: cover;
          `}
          src={authorizationImage}
          alt="Илюстрация."
        />
      </div>
      <div
        className={css`
          padding: 48px 56px;
          background-color: #ffffff;
        `}
      >
        <div
          className={css`
            display: grid;
            row-gap: 16px;
          `}
        >
          <div
            className={css`
              display: grid;
              row-gap: 24px;
            `}
          >
            <div
              className={css`
                display: grid;
                row-gap: 32px;
              `}
            >
              <Typography variant="h5">Создать учётную запись</Typography>
              <div
                className={css`
                  display: grid;
                  row-gap: 24px;
                `}
              >
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
              </div>
            </div>
            <div
              className={css`
                display: grid;
                row-gap: 32px;
              `}
            >
              <Typography variant="caption">
                Регистрируясь, Вы соглашаетесь с{' '}
                <a
                  className={css`
                    cursor: pointer;
                  `}
                >
                  политикой обработки персональных данных
                </a>
              </Typography>
              <Button onClick={() => {}}>Зарегистрироваться</Button>
            </div>
          </div>
          <Typography variant="subtitle2">
            <a
              className={css`
                cursor: pointer;
              `}
              onClick={(event) => {
                event.preventDefault();
                navigate('/authorization');
              }}
            >
              Уже зарегистрированы?
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
};
