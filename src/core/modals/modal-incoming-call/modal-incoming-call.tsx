import { Box, Modal, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { socket } from 'core/utils/socket';
import { setMeetAction } from 'modules/meet/store';
import { User } from 'modules/user/services/types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type ModalIncomingCallProps = {
  open: boolean;
  onClose: () => void;
  user: User | null;
};

const ModalIncomingCall = ({ open, onClose, user }: ModalIncomingCallProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'grid',
          rowGap: '32px',
          alignItems: 'center',
          background: '#ffffff',
          borderRadius: '8px',
          padding: '16px 32px',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography>Вам звонит пользователь: {user?.name ? user.name : 'Неизвестный'}</Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, max-content)',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '16px',
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              dispatch(setMeetAction({ user, isInitiator: false }));

              if (user?.id) {
                navigate('/meet');
              }

              onClose();
            }}
          >
            Ответить
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (user?.id) {
                socket.emit('client:meet_end_call', user.id);
              }

              onClose();
            }}
          >
            Отклонить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export const ModalIncomingCallMemoized = memo(ModalIncomingCall);
