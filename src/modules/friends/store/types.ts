import { User } from 'modules/user/services/types';

export type FriendsState = {
  friends: User[];
  status: {
    // TODO: Добавить константу статусов
    friends: 'idle' | 'ready' | 'running' | 'success' | 'error';
    add_to_friends: 'idle' | 'ready' | 'running' | 'success' | 'error';
    remove_from_friends: 'idle' | 'ready' | 'running' | 'success' | 'error';
  };
  loading: {
    friends: boolean;
    add_to_friends: boolean;
    remove_from_friends: boolean;
  };
  error: {
    friends: any | null;
    add_to_friends: any | null;
    remove_from_friends: any | null;
  };
};
