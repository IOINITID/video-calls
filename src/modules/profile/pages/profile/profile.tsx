import { ChangeEvent, memo, useState } from 'react';
import { Box, Typography, Link, Snackbar, Slide } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userUserSelector } from 'modules/user/store/selectors';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'core/components/navigation';
import { Button } from 'core/components/button';
import { patchUserAction, postLogoutAction } from 'modules/user/store/actions';
import { socket } from 'core/utils/socket';
import { theme } from 'core/theme';
import { TextField } from 'core/components/text-field';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { AddPhotoAlternateOutlined } from '@mui/icons-material';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(userUserSelector);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState(user?.color);
  const [image, setImage] = useState('');

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content 1fr', height: '100%' }}>
      <Box sx={{ backgroundColor: theme.palette.grey[200] }}>
        <Navigation />
      </Box>
      <Box sx={{ display: 'grid', padding: '32px' }}>
        <Typography>Предпросмотр</Typography>
        {/* Card */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: '60px 1fr',
            width: '300px',
            maxHeight: '429px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {/* Card header */}
          <Box
            sx={{
              position: 'relative',
              height: '60px',
              backgroundColor: user?.color,
            }}
          >
            {/* Card user image */}
            <Box
              sx={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                width: '92px',
                height: '92px',
                backgroundImage: image ? `url(${image})` : `url(${user?.image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '50% 50%',
                border: `6px solid ${theme.palette.grey[900]}`,
                borderRadius: '50%',
              }}
            >
              <Box
                sx={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: theme.palette.grey[300],
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  borderRadius: '50%',
                }}
              >
                <AddPhotoAlternateOutlined
                  sx={{
                    width: '18px',
                    height: '18px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* Card user info */}
          <Box
            sx={{
              padding: '64px 16px 16px 16px',
              backgroundColor: theme.palette.grey['900'],
            }}
          >
            {/* Username */}
            <Typography color="lightgray">
              {user?.name}
              <Typography component="span" color="lightgray">
                #{user?.id.slice(-4)}
              </Typography>
            </Typography>
            {/* About me */}
            <Typography
              sx={{ borderTop: `1px solid ${theme.palette.grey[800]}` }}
              variant="subtitle1"
              color="lightgray"
            >
              Обо мне
            </Typography>
            <Typography sx={{ maxHeight: '108px' }} color="lightgray">
              Информация о пользователе.
            </Typography>
            {/* Profile settings */}
            <Typography variant="subtitle1" color="lightgray">
              Настройка профиля
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: '64px 1fr', columnGap: '16px', alignItems: 'center' }}>
              {/* Edit icon */}
              <Box
                sx={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: theme.palette.primary.light,
                  borderRadius: '8px',
                }}
              />
              {/* Edit info */}
              <Box>
                <Typography variant="subtitle1" color="lightgray">
                  Профиль пользователя
                </Typography>
                <Typography color="lightgray">Прошло 10:01</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography variant="h5">Цвет профиля: {user?.color}</Typography>
        <TextField
          type="color"
          id="color"
          name="color"
          label="Цвет профиля"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          placeholder="Выберите цвет профиля"
          autoComplete="off"
          fullWidth
        />
        <Typography variant="h5">Изображение профиля</Typography>
        <TextField
          type="file"
          id="image"
          name="image"
          label="Изображение профиля"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const image = event.target.files ? event.target.files[0] : null;
            const fileReader = new FileReader();

            if (image) {
              fileReader.readAsDataURL(image);
              fileReader.onload = () => {
                const IMAGE_MAX_SIZE = 5 * 1024 * 1024;

                if (image.size > IMAGE_MAX_SIZE) {
                  toast.error('Изображение должно быть не более 5MB.');
                }

                setImage(String(fileReader.result));
              };
            }

            setImage(event.target.value);
          }}
          placeholder="Выберите изображение профиля"
          autoComplete="off"
          fullWidth
          focused
        />
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
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(
                patchUserAction({
                  email: email ? email : undefined,
                  name: name ? name : undefined,
                  color: color ? color : undefined,
                  image: image ? image : undefined,
                  password,
                })
              );
            }}
          >
            Сохранить
          </LoadingButton>
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
          {/* <Snackbar
            key={Slide.name}
            message="Аккуратнее, вы не сохранили изменения!"
            TransitionComponent={Slide}
            open={isFieldsChange}
            onClose={() => setIsFieldsChange(false)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            action={
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'max-content max-content',
                  columnGap: '16px',
                  alignItems: 'center',
                }}
              >
                <Link
                  underline="hover"
                  onClick={() => {
                    setEmail('');
                    setName('');
                    setPassword('');
                    setColor(user?.color);
                    setImage('');
                  }}
                >
                  <Typography>Сброс</Typography>
                </Link>
                <LoadingButton
                  variant="contained"
                  color="success"
                  onClick={() => {
                    dispatch(
                      patchUserAction({
                        email: email ? email : undefined,
                        name: name ? name : undefined,
                        color: color ? color : undefined,
                        image: image ? image : undefined,
                        password,
                      })
                    );
                  }}
                >
                  Сохранить изменения
                </LoadingButton>
              </Box>
            }
          /> */}
          {/* <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr max-content max-content',
              columnGap: '16px',
              alignItems: 'center',
              backgroundColor: theme.palette.grey[400],
              padding: '16px',
              borderRadius: '8px',
              // position: fixed;
              // width: calc(100% - 136px);
              // bottom: -70px;
              // bottom: 32px;
            }}
          >
            <Typography>Аккуратнее, вы не сохранили изменения!</Typography>
            <Link underline="hover">
              <Typography>Сброс</Typography>
            </Link>
            <Button variant="contained" color="success">
              Сохранить изменения
            </Button>
          </Box> */}
        </Typography>
      </Box>
    </Box>
  );
};

export const ProfileMemoized = memo(Profile);
