import { User } from 'modules/user/services/types';
import { FriendsUser } from '../types';

export type FriendsState = {
  friends: User[];
  friends_users: FriendsUser[];
  status: {
    // TODO: Добавить константу статусов
    friends: 'idle' | 'ready' | 'running' | 'success' | 'error';
    friends_users: 'idle' | 'ready' | 'running' | 'success' | 'error';
    add_to_friends: 'idle' | 'ready' | 'running' | 'success' | 'error';
    remove_from_friends: 'idle' | 'ready' | 'running' | 'success' | 'error';
  };
  loading: {
    friends: boolean;
    friends_users: boolean;
    add_to_friends: boolean;
    remove_from_friends: boolean;
  };
  error: {
    friends: any | null;
    friends_users: any | null;
    add_to_friends: any | null;
    remove_from_friends: any | null;
  };
};
