import { css } from '@emotion/css';
import { AddPhotoAlternateOutlined, CancelOutlined, Check, Colorize, Edit } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Link, Slide, Snackbar, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { TextField } from 'core/components/text-field';
import { theme } from 'core/theme';
import { socket } from 'core/utils/socket';
import { useTimer } from 'modules/settings/hooks';
import { patchUserAction, postLogoutAction } from 'modules/user/store/actions';
import { userUserSelector } from 'modules/user/store/selectors';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(userUserSelector);

  const [email, setEmail] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState('');
  const [isDefaultColor, setIsDefaultColor] = useState(true);
  const [isFieldsChanged, setIsFieldsChanged] = useState(false);

  const { minutes, seconds } = useTimer();

  const imageInput = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
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
  };

  useEffect(() => {
    const handleEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate('friends');
      }
    };

    document.addEventListener('keydown', handleEscapeKeyDown);

    return () => document.removeEventListener('keydown', handleEscapeKeyDown);
  }, []);

  useEffect(() => {
    if (color !== '' || image !== '') {
      setIsFieldsChanged(true);
    } else {
      setIsFieldsChanged(false);
    }
  }, [color, image]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'grid',
        padding: '60px 40px 80px 40px',
        alignContent: 'start',
        backgroundColor: '#5e6065',
      }}
    >
      {/* NOTE: Input для загрузки изображения */}
      <TextField
        sx={{ display: 'none' }}
        type="file"
        id="image"
        name="image"
        label="Изображение профиля"
        inputProps={{ ref: (input: any) => (imageInput.current = input) }}
        onChange={handleImageChange}
        placeholder="Выберите изображение профиля"
        autoComplete="off"
        fullWidth
        focused
      />
      {/* NOTE: Сохранение изменений профиля пользователя */}
      <Snackbar
        key={Slide.name}
        message="Аккуратнее, вы не сохранили изменения!"
        TransitionComponent={Slide}
        open={isFieldsChanged}
        sx={{
          '&': {
            position: 'absolute',
            left: '40px',
            transform: 'none',
            width: '100%',

            '.MuiSnackbarContent-root': {
              width: '100%',
            },
          },
        }}
        onClose={(event, reason) => {
          if (reason === 'clickaway') {
            return;
          }

          setIsFieldsChanged(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        action={
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, max-content)',
              columnGap: '16px',
              alignItems: 'center',
            }}
          >
            <Link
              sx={{ cursor: 'pointer' }}
              underline="hover"
              onClick={() => {
                setColor('');
                setImage('');
              }}
            >
              <Typography>Сброс</Typography>
            </Link>
            <LoadingButton
              variant="contained"
              color="success"
              onClick={() => {
                dispatch(patchUserAction({ color: color ? color : undefined, image: image ? image : undefined }));
                setColor('');
                setImage('');
              }}
            >
              Сохранить изменения
            </LoadingButton>
          </Box>
        }
      />
      <Typography
        className={css`
          padding-bottom: 20px !important;
          font-weight: 600 !important;
          font-size: 20px !important;
          line-height: 24px !important;
          color: #ffffff !important;
          border-bottom: 1px solid #000000;
        `}
      >
        Профиль пользователя
      </Typography>
      <Box
        sx={{
          display: 'grid',
          rowGap: '8px',
          position: 'absolute',
          top: '60px',
          right: '-40px',
          textAlign: 'center',
          cursor: 'pointer',

          '&:hover svg, &:focus svg': {
            fill: '#ffffff',
          },
        }}
        onClick={() => navigate('/friends')}
      >
        <CancelOutlined sx={{ width: '36px', height: '36px', fill: '#b9bbbe' }} />
        <Typography sx={{ fontSize: '13px', color: '#b9bbbe' }}>ESC</Typography>
      </Box>
      {/* NOTE: Аватар, цвет профиля и обо мне */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '340px 300px',
          columnGap: '20px',
          justifyContent: 'space-between',
        }}
      >
        {/* NOTE: Аватар */}
        <Box>
          <Box sx={{ padding: '20px 0', borderBottom: '1px solid #000000' }}>
            <Typography
              className={css`
                margin-bottom: 8px !important;
                font-weight: 600 !important;
                font-size: 12px !important;
                line-height: 16px !important;
                text-transform: uppercase !important;
              `}
            >
              Аватар
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                if (imageInput.current) {
                  imageInput.current.click();
                }
              }}
            >
              Смена аватара
            </Button>
          </Box>
          {/* NOTE: Цвет профиля */}
          <Box sx={{ padding: '20px 0', borderBottom: '1px solid #000000' }}>
            <Typography
              className={css`
                margin-bottom: 8px !important;
                font-weight: 600 !important;
                font-size: 12px !important;
                line-height: 16px !important;
                text-transform: uppercase !important;
              `}
            >
              Цвет профиля
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'max-content max-content', columnGap: '16px' }}>
              {/* NOTE: По умолчанию */}
              <Box>
                <Box
                  sx={{
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: user?.color ? user.color : user?.default_color,
                    width: '70px',
                    height: '50px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setIsDefaultColor(true);
                  }}
                >
                  {isDefaultColor && <Check sx={{ fill: '#ffffff' }} width={24} height={24} />}
                </Box>
                <Typography
                  className={css`
                    font-size: 12px !important;
                    line-height: 16px !important;
                  `}
                >
                  По умолчанию
                </Typography>
              </Box>
              {/* NOTE: Пользовательские */}
              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: color,
                    width: '70px',
                    height: '50px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: color ? '' : '1px solid #000000',
                  }}
                  onClick={() => {
                    setColor('#000000');
                    setIsDefaultColor(false);
                  }}
                >
                  {!isDefaultColor && <Check sx={{ fill: '#ffffff' }} width={24} height={24} />}
                  <input
                    className={css`
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      cursor: pointer;
                      opacity: 0;
                    `}
                    type="color"
                    value={color}
                    onChange={(event) => {
                      setColor(event.target.value);
                      setIsDefaultColor(false);
                    }}
                  />
                </Box>
                <Colorize sx={{ position: 'absolute', top: '0', right: '8px' }} width={14} height={14} />
                <Typography
                  className={css`
                    font-size: 12px !important;
                    line-height: 16px !important;
                  `}
                >
                  Пользовательские
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* NOTE: Обо мне */}
          <Box sx={{ padding: '20px 0' }}>
            <Typography
              className={css`
                margin-bottom: 8px !important;
                font-weight: 600 !important;
                font-size: 12px !important;
                line-height: 16px !important;
                text-transform: uppercase !important;
              `}
            >
              Обо мне
            </Typography>
            <Typography
              className={css`
                margin-bottom: 8px !important;
                font-size: 14px !important;
                line-height: 20px !important;
              `}
            >
              Можно использовать разметку теста и ссылки.
            </Typography>
            {/* TODO: Максимальное число символов 190 и иконка открытия emoji. */}
            <TextField multiline rows={4} fullWidth />
          </Box>
        </Box>
        {/* NOTE: Предпросмотр */}
        <Box>
          <Box sx={{ padding: '20px 0 0 0' }}>
            <Typography
              className={css`
                margin-bottom: 8px !important;
                font-weight: 600 !important;
                font-size: 12px !important;
                line-height: 16px !important;
                text-transform: uppercase !important;
              `}
            >
              Предпросмотр
            </Typography>
          </Box>
          {/* NOTE: Карточка */}
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
            {/* NOTE: Карточка профиля пользователя */}
            <Box
              sx={{
                position: 'relative',
                height: '60px',
                backgroundColor: user?.color ? user.color : user?.default_color,
              }}
            >
              {/* NOTE: Аватар пользователя */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  width: '92px',
                  height: '92px',
                  backgroundImage: image ? `url(${image})` : `url(${user?.image})`,
                  backgroundColor: user?.color ? user.color : user?.default_color,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: '50% 50%',
                  border: `6px solid ${theme.palette.grey[900]}`,
                  borderRadius: '50%',
                  cursor: 'pointer',

                  '&:hover, &:focus': {
                    '&::before': {
                      content: '""',
                      display: 'block',
                      width: '100%',
                      height: '100%',
                      backdropFilter: 'brightness(0.75)',
                      borderRadius: '50%',
                      overflow: 'hidden',
                    },
                    '&::after': {
                      content: '"Изменить аватар"',
                      display: 'block',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                      color: 'white',
                      fontFamily: 'sans-serif',
                      textTransform: 'uppercase',
                      fontSize: '10px',
                    },
                  },
                }}
                onClick={() => {
                  if (imageInput.current) {
                    imageInput.current.click();
                  }
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
                padding: '48px 16px 16px 16px',
                backgroundColor: theme.palette.grey['900'],
              }}
            >
              {/* NOTE: Имя пользователя */}
              <Typography
                className={css`
                  padding: 16px 0;
                  color: #ffffff;
                `}
              >
                {user?.name}
                {/* NOTE: Тег пользователя */}
                <Typography
                  className={css`
                    font-size: 20px;
                    line-height: 24px;
                    color: #b9bbbe;
                    text-transform: uppercase;
                  `}
                  component="span"
                >
                  #{user?.id.slice(-4)}
                </Typography>
              </Typography>
              {/* NOTE: Обо мне */}
              <Typography
                className={css`
                  margin-bottom: 8px !important;
                  padding: 20px 0 0 0 !important;
                  font-weight: 600 !important;
                  font-size: 12px !important;
                  line-height: 16px !important;
                  color: #b9bbbe;
                  text-transform: uppercase !important;
                  border-top: 1px solid ${theme.palette.grey[800]};
                `}
                variant="subtitle1"
              >
                Обо мне
              </Typography>
              <Typography sx={{ maxHeight: '108px', paddingBottom: '20px' }} color="lightgray">
                Информация о пользователе.
              </Typography>
              {/* NOTE: Настройка профиля */}
              <Typography
                className={css`
                  margin-bottom: 8px !important;
                  padding: 20px 0 0 0 !important;
                  font-weight: 600 !important;
                  font-size: 12px !important;
                  line-height: 16px !important;
                  color: #b9bbbe;
                  text-transform: uppercase !important;
                  border-top: 1px solid ${theme.palette.grey[800]};
                `}
                variant="subtitle1"
              >
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
                    display: 'grid',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Edit sx={{ fill: '#ffffff' }} width={24} height={24} />
                </Box>
                {/* Edit info */}
                <Box>
                  <Typography variant="subtitle1" color="lightgray">
                    Профиль пользователя
                  </Typography>
                  <Typography color="lightgray">
                    Прошло {minutes}:{seconds}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* NOTE: Email пользователя */}
      <Box sx={{ display: 'none' }}>
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
      </Box>
    </Box>
  );
};

export const UserProfileMemoized = memo(UserProfile);