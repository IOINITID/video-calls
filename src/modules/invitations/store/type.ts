import { User } from 'modules/user/services/types';

export type InvitationsState = {
  invitations: {
    sent: User[];
    received: User[];
  };
  status: {
    // TODO: Добавить константу статусов
    invitations: 'idle' | 'ready' | 'running' | 'success' | 'error';
    sent_invitations: 'idle' | 'ready' | 'running' | 'success' | 'error';
    decline_invitations: 'idle' | 'ready' | 'running' | 'success' | 'error';
  };
  loading: {
    invitations: boolean;
    sent_invitations: boolean;
    decline_invitations: boolean;
  };
  error: {
    invitations: any | null;
    sent_invitations: any | null;
    decline_invitations: any | null;
  };
};
