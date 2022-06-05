import { User } from 'modules/user/services/types';

export type InvitationsState = {
  invitations: {
    sent: User[];
    received: User[];
  };
  status: {
    // TODO: Добавить константу статусов
    invitations: 'idle' | 'ready' | 'running' | 'success' | 'error';
  };
  loading: {
    invitations: boolean;
  };
  error: {
    invitations: any | null;
  };
};
