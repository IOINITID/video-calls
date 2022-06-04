import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'modules/user/services/types';
import { FriendsState } from './types';

const initialState: FriendsState = {
  friends: [],
  status: {
    friends: 'idle',
  },
  loading: {
    friends: false,
  },
  error: {
    friends: null,
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
  },
});

export const { requestGetFriendsAction, successGetFriendsAction, failureGetFriendsAction } = friendsSlice.actions;

export const friendsReducer = friendsSlice.reducer;
