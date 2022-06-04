import { User } from 'modules/user/services/types';

export type FriendsState = {
  friends: User[];
  status: {
    // TODO: Добавить константу статусов
    friends: 'idle' | 'ready' | 'running' | 'success' | 'error';
  };
  loading: {
    friends: boolean;
  };
  error: {
    friends: any | null;
  };
};
