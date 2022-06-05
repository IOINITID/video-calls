import { User } from 'modules/user/services/types';

export type GetInvitationsResponse = {
  invitations: {
    sent: User[];
    received: User[];
  };
};

export type SentInvitationsResponse = {
  invitations: {
    sent: User[];
    received: User[];
  };
};

export type DeclineInvitationsResponse = {
  invitations: {
    sent: User[];
    received: User[];
  };
};
