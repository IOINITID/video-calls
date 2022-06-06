import { User } from 'modules/user/services/types';

export type GetFriendsResponse = {
  friends: User[];
};

export type AddToFriendsResponse = {
  friends: User[];
};

export type RemoveFromFriendsResponse = {
  friends: User[];
};
