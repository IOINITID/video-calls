import { Modal, Typography } from '@mui/material';
import { Button } from 'core/components/button';
import { socket } from 'core/utils/socket';
import { User } from 'modules/user/services/types';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

type ModalIncomingCallProps = {
  open: boolean;
  onClose: () => void;
  user: User | undefined;
};

const ModalIncomingCall = ({ open, onClose, user }: ModalIncomingCallProps) => {
  const navigate = useNavigate();

  return (
    <Modal open={open} onClose={onClose}>
      <>
        <Typography>Вам звонит пользователь: {user?.name ? user.name : 'Неизвестный'}</Typography>

        <Button
          variant="contained"
          color="success"
          onClick={() => {
            if (user?.id) {
              navigate(`meet/${user.id}`);
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
      </>
    </Modal>
  );
};

export const ModalIncomingCallMemoized = memo(ModalIncomingCall);
