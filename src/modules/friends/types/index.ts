import { User } from 'modules/user/services/types';

export type FriendsUser = User & {
  sent_invitation: boolean | null;
  add_to_friends: boolean | null;
};

export type GetFriendsResponse = {
  friends: User[];
};

export type GetFriendsUsersResponse = {
  friends_users: FriendsUser[];
};

export type AddToFriendsResponse = {
  friends: User[];
};

export type RemoveFromFriendsResponse = {
  friends: User[];
};
