import { memo } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { userEmailSelector, userIdSelector, userNameSelector } from 'modules/user/store/selectors';
import { useNavigate } from 'react-router-dom';
import { Navigation } from 'core/components/navigation';
import { Button } from 'core/components/button';
import { postLogoutAction } from 'modules/user/store/actions';
import { socket } from 'core/utils/socket';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = useSelector(userEmailSelector);
  const userName = useSelector(userNameSelector);
  const userId = useSelector(userIdSelector);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'grid',
        gridTemplateColumns: 'max-content 1fr',
        width: '100%',
        height: '100%',
        alignContent: 'start',
      }}
    >
      <Navigation />
      <Box>
        <Typography variant="h5">Ваш email: {userEmail}</Typography>
        <Typography variant="h5">Ваше имя: {userName}</Typography>
        {/* TODO: Нужен пароль (скрытый или последние символы) */}
        <Typography variant="h5">Ваш пароль:</Typography>
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

              socket.emit('on-disconnect', userId);
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
