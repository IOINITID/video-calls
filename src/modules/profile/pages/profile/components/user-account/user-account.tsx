import { css } from '@emotion/css';
import { CancelOutlined } from '@mui/icons-material';
import { Box, Typography, Link } from '@mui/material';
import { Button } from 'core/components/button';
import { theme } from 'core/theme';
import { userUserSelector } from 'modules/user/store/selectors';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModalChangeUserNameMemoized } from '../../modals/modal-change-user-name';

const UserAccount = () => {
  const navigate = useNavigate();

  const user = useSelector(userUserSelector);

  const [isEmailShow, setIsEmailShow] = useState(false);

  const [isModalChangeUserName, setIsModalChangeUserName] = useState(false);

  const getHiddenUserEmail = (email: string) => {
    const firstPartEndIndex = email.search('@');
    const hiddenValues = Array(firstPartEndIndex).fill('*').join('');

    return hiddenValues + email.slice(firstPartEndIndex);
  };

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
      <ModalChangeUserNameMemoized
        isOpen={isModalChangeUserName}
        onClose={() => {
          setIsModalChangeUserName(false);
        }}
      />
      <Typography
        className={css`
          padding-bottom: 20px !important;
          font-weight: 600 !important;
          font-size: 20px !important;
          line-height: 24px !important;
          color: #ffffff !important;
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
          cursor: 'pointer',

          '&:hover svg, &:focus svg': {
            fill: '#ffffff',
          },
        }}
        onClick={() => navigate('friends')}
      >
        <CancelOutlined sx={{ width: '36px', height: '36px', fill: '#b9bbbe' }} />
        <Typography sx={{ fontSize: '13px', color: '#b9bbbe' }}>ESC</Typography>
      </Box>
      {/* NOTE: Содержимое страницы */}
      <Box sx={{ display: 'grid' }}>
        {/* NOTE: Предупреждение для подтверждения почты */}
        <Box
          sx={{
            backgroundColor: '#36383a',
            border: '1px solid#1c1e21',
            borderRadius: '4px',
            padding: '20px',
          }}
        >
          <Box>{/* NOTE: Иконка предупреждения */}</Box>
          <Box
            sx={{
              display: 'grid',
              rowGap: '8px',
              justifyItems: 'start',
            }}
          >
            <Typography sx={{ fontSize: '12px', color: '#c0c1c4', textTransform: 'uppercase' }}>
              Неподтвержденный адрес эл.почты
            </Typography>
            <Typography sx={{ fontSize: '14px', color: '#dfe0e1' }}>
              Пожалуйста, проверьте свою электронную почту и следуйте инструкциям, чтобы подтвердить свой адресс
              электронной почты. Если вы не получили письмо или у него истек срок действия, вы можете попросить
              отправить новое.
            </Typography>
            <Button
              sx={{
                textTransform: 'none',
                backgroundColor: '#686d73',

                '&:hover, &:focus': {
                  backgroundColor: '#84888d',
                },

                '&:active': {
                  backgroundColor: '#6b6e74',
                },
              }}
              variant="contained"
            >
              Отправить письмо с подтверждением еще раз
            </Button>
          </Box>
        </Box>
        {/* NOTE: Профиль пользователя */}
        <Box sx={{ margin: '20px 0', backgroundColor: '#36383a', borderRadius: '4px', overflow: 'hidden' }}>
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
                border: `6px solid #36383a`,
                borderRadius: '50%',
                cursor: 'pointer',
              }}
            >
              <Box
                sx={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: user?.status === 'online' ? '#4caf50' : '#ef5350',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  borderRadius: '50%',
                  border: '4px solid #36383a',
                }}
              />
            </Box>
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
            <Typography sx={{ fontSize: '20px', color: '#ffffff' }}>
              {user?.name}
              <Typography component="span" sx={{ fontSize: '20px', color: '#c0c1c4' }}>
                #{user?.id.slice(-4)}
              </Typography>
            </Typography>
            <Button sx={{ textTransform: 'none' }} variant="contained">
              Настр. профиль пользователя
            </Button>
          </Box>
          <Box
            sx={{
              display: 'grid',
              margin: '16px',
              padding: '16px',
              backgroundColor: '#43454a',
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
                <Typography sx={{ fontSize: '12px', color: '#c0c1c4', textTransform: 'uppercase' }}>
                  Имя пользователя
                </Typography>
                <Typography sx={{ fontSize: '16px', color: '#ffffff' }}>
                  {user?.name}
                  <Typography component="span" sx={{ fontSize: '16px', color: '#c0c1c4', textTransform: 'uppercase' }}>
                    #{user?.id.slice(-4)}
                  </Typography>
                </Typography>
              </Box>
              <Button
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#686d73',

                  '&:hover, &:focus': {
                    backgroundColor: '#84888d',
                  },

                  '&:active': {
                    backgroundColor: '#6b6e74',
                  },
                }}
                variant="contained"
                onClick={() => {
                  setIsModalChangeUserName(true);
                }}
              >
                Изменить
              </Button>
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
                <Typography sx={{ fontSize: '12px', color: '#c0c1c4', textTransform: 'uppercase' }}>
                  Электронная почта
                </Typography>
                <Typography
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, max-content)',
                    columnGap: '8px',
                    fontSize: '16px',
                    color: '#ffffff',
                  }}
                >
                  {isEmailShow ? user?.email : getHiddenUserEmail(user?.email as string)}
                  <Link
                    sx={{ cursor: 'pointer', color: '#19b7f5' }}
                    underline="hover"
                    onClick={() => {
                      setIsEmailShow(!isEmailShow);
                    }}
                  >
                    <Typography>{isEmailShow ? 'Скрыть' : 'Показать'}</Typography>
                  </Link>
                </Typography>
              </Box>
              <Button
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#686d73',

                  '&:hover, &:focus': {
                    backgroundColor: '#84888d',
                  },

                  '&:active': {
                    backgroundColor: '#6b6e74',
                  },
                }}
                variant="contained"
              >
                Изменить
              </Button>
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
                <Typography sx={{ fontSize: '12px', color: '#c0c1c4', textTransform: 'uppercase' }}>
                  Номер телефона
                </Typography>
                <Typography sx={{ fontSize: '16px', color: '#ffffff' }}>
                  {(user as any)?.phone ? '+79000000000' : 'Вы еще не указали номер телефона.'}
                </Typography>
              </Box>
              <Button
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#686d73',

                  '&:hover, &:focus': {
                    backgroundColor: '#84888d',
                  },

                  '&:active': {
                    backgroundColor: '#6b6e74',
                  },
                }}
                variant="contained"
              >
                Изменить
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const UserAccountMemoized = memo(UserAccount);
