import { Close } from '@mui/icons-material';
import { Box, Link, Modal, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { TextField } from 'core/components/text-field';
import { requestUpdateUserAction } from 'modules/user/store';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

const ModalChangeUserEmail = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal open={isOpen} onBackdropClick={onClose} disableEnforceFocus>
      <Box
        sx={{
          width: '440px',
          backgroundColor: '#4a4c52',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '5px',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', display: 'grid', rowGap: '8px', padding: '24px 16px' }}>
          <Typography sx={{ fontSize: '24px', color: '#ffffff', textAlign: 'center' }}>
            Введите адрес электронной почты
          </Typography>
          <Typography sx={{ fontSize: '16px', color: '#c0c1c4', textAlign: 'center' }}>
            Введите новый адрес электронной почты и текущий пароль.
          </Typography>
          <Box
            sx={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              cursor: 'pointer',

              '& svg': {
                fill: '#c0c1c4',
              },
              '& svg:hover, & svg:focus': {
                fill: '#ffffff',
              },
            }}
            onClick={onClose}
          >
            <Close />
          </Box>
        </Box>
        <Box sx={{ display: 'grid', rowGap: '16px', padding: '0 16px 24px 16px' }}>
          <Box sx={{ display: 'grid', rowGap: '8px' }}>
            <Typography sx={{ fontSize: '14px', color: '#c0c1c4', textTransform: 'uppercase' }}>
              Электронная почта
            </Typography>
            <TextField
              sx={{
                backgroundColor: '#36383a',

                '.MuiOutlinedInput-input': {
                  color: '#dfe0e1',
                },

                // NOTE: Удаляет светлую тень в браузерных стилях
                'input:-webkit-autofill': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
                'input:-webkit-autofill:hover': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
                'input:-webkit-autofill:focus': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
                'input:-webkit-autofill:active': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
              }}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="off"
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'grid', rowGap: '8px' }}>
            <Typography sx={{ fontSize: '14px', color: '#c0c1c4', textTransform: 'uppercase' }}>
              Текущий пароль
            </Typography>
            <TextField
              sx={{
                backgroundColor: '#36383a',

                '.MuiOutlinedInput-input': {
                  color: '#dfe0e1',
                },

                // NOTE: Удаляет светлую тень в браузерных стилях
                'input:-webkit-autofill': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
                'input:-webkit-autofill:hover': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
                'input:-webkit-autofill:focus': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
                'input:-webkit-autofill:active': {
                  boxShadow: '0 0 0 30px #36383a inset',
                },
              }}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
              fullWidth
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'grid',
            justifyContent: 'end',
            gridTemplateColumns: 'repeat(2, max-content)',
            columnGap: '8px',
            padding: '16px',
            backgroundColor: '#43454a',
          }}
        >
          <Link
            sx={{ display: 'grid', alignItems: 'center', color: '#ffffff', cursor: 'pointer', padding: '2px 16px' }}
            underline="hover"
            onClick={() => {
              setEmail('');
              setPassword('');
              onClose();
            }}
          >
            <Typography sx={{ fontSize: '14px' }}>Отмена</Typography>
          </Link>
          <Button
            sx={{ textTransform: 'initial' }}
            variant="contained"
            onClick={() => {
              // TODO: Добавить валидацию на email и длину пароля
              if (email.trim() && password.trim()) {
                dispatch(requestUpdateUserAction({ email, password }));
                onClose();
              }
            }}
          >
            Готово
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export const ModalChangeUserEmailMemoized = memo(ModalChangeUserEmail);
