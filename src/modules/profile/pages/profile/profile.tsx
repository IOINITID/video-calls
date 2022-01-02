import { memo } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { userEmailSelector, userNameSelector } from '../../../user/store/selectors';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const userEmail = useSelector(userEmailSelector);
  const userName = useSelector(userNameSelector);

  return (
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
      </Typography>
    </Box>
  );
};

export const ProfileMemoized = memo(Profile);
