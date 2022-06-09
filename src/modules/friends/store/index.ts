import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'modules/user/services/types';
import { FriendsUser } from '../types';
import { FriendsState } from './types';

const initialState: FriendsState = {
  friends: [],
  friends_users: [],
  status: {
    friends: 'idle',
    friends_users: 'idle',
    add_to_friends: 'idle',
    remove_from_friends: 'idle',
  },
  loading: {
    friends: false,
    friends_users: false,
    add_to_friends: false,
    remove_from_friends: false,
  },
  error: {
    friends: null,
    friends_users: null,
    add_to_friends: null,
    remove_from_friends: null,
  },
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    // NOTE: Получение списка друзей
    requestGetFriendsAction: (state: FriendsState) => {
      state.status.friends = 'running';
      state.loading.friends = true;
    },
    successGetFriendsAction: (state: FriendsState, { payload }: PayloadAction<User[]>) => {
      state.friends = payload;
      state.status.friends = 'success';
      state.loading.friends = false;
      state.error.friends = null;
    },
    failureGetFriendsAction: (state: FriendsState, { payload }: PayloadAction<any | null>) => {
      // const {error}= getError();
      state.status.friends = 'error';
      state.loading.friends = false;
      state.error.friends = payload;
    },
    // NOTE: Получение списка пользователей, которых можно добавить в друзья
    requestGetFriendsUsersAction: (state: FriendsState) => {
      state.status.friends_users = 'running';
      state.loading.friends_users = true;
    },
    successGetFriendsUsersAction: (state: FriendsState, { payload }: PayloadAction<FriendsUser[]>) => {
      state.friends_users = payload;
      state.status.friends_users = 'success';
      state.loading.friends_users = false;
      state.error.friends_users = null;
    },
    failureGetFriendsUsersAction: (state: FriendsState, { payload }: PayloadAction<any | null>) => {
      // const {error}= getError();
      state.status.friends_users = 'error';
      state.loading.friends_users = false;
      state.error.friends_users = payload;
    },
    // NOTE: Добавление в список друзей
    requestAddToFriendsAction: (state: FriendsState, { payload }: PayloadAction<{ friend_id: string }>) => {
      state.status.add_to_friends = 'running';
      state.loading.add_to_friends = true;
    },
    successAddToFriendsAction: (state: FriendsState, { payload }: PayloadAction<User[]>) => {
      state.friends = payload;
      state.status.add_to_friends = 'success';
      state.loading.add_to_friends = false;
      state.error.add_to_friends = null;
    },
    failureAddToFriendsAction: (state: FriendsState, { payload }: PayloadAction<any | null>) => {
      // const {error}= getError();
      state.status.add_to_friends = 'error';
      state.loading.add_to_friends = false;
      state.error.add_to_friends = payload;
    },
    // NOTE: Удаление из списка друзей
    requestRemoveFromFriendsAction: (state: FriendsState, { payload }: PayloadAction<{ friend_id: string }>) => {
      state.status.remove_from_friends = 'running';
      state.loading.remove_from_friends = true;
    },
    successRemoveFromFriendsAction: (state: FriendsState, { payload }: PayloadAction<User[]>) => {
      state.friends = payload;
      state.status.remove_from_friends = 'success';
      state.loading.remove_from_friends = false;
      state.error.remove_from_friends = null;
    },
    failureRemoveFromFriendsAction: (state: FriendsState, { payload }: PayloadAction<any | null>) => {
      // const {error}= getError();
      state.status.remove_from_friends = 'error';
      state.loading.remove_from_friends = false;
      state.error.remove_from_friends = payload;
    },
  },
});

export const {
  requestGetFriendsAction,
  successGetFriendsAction,
  failureGetFriendsAction,
  requestAddToFriendsAction,
  successAddToFriendsAction,
  failureAddToFriendsAction,
  requestRemoveFromFriendsAction,
  successRemoveFromFriendsAction,
  failureRemoveFromFriendsAction,
  requestGetFriendsUsersAction,
  successGetFriendsUsersAction,
  failureGetFriendsUsersAction,
} = friendsSlice.actions;

export const friendsReducer = friendsSlice.reducer;
