import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getApprovals } from '../../../core/services/get-approvals';
import { getFriends } from '../../../core/services/get-friends';
import { getInvites } from '../../../core/services/get-invites';
import { getUsers } from '../../../core/services/get-users';
import { UserResponse, UserState } from './types';

const initialState: UserState = {
  id: '',
  email: '',
  name: '',
  token: localStorage.getItem('token') || '',
  isAuthorizated: false,
  users: [],
  friends: [],
  invites: [],
  approvals: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (
      state: UserState,
      { payload }: PayloadAction<{ id: string; email: string; name: string; token: string }>
    ) => {
      state.id = payload.id;
      state.email = payload.email;
      state.name = payload.name;
      state.token = payload.token;
      state.isAuthorizated = true;
      localStorage.setItem('token', payload.token);
    },
    setLogout: (state: UserState) => {
      state.id = '';
      state.email = '';
      state.name = '';
      state.token = '';
      state.isAuthorizated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.users = payload;
    });
    builder.addCase(getFriends.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.friends = payload;
    });
    builder.addCase(getInvites.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.invites = payload;
    });
    builder.addCase(getApprovals.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.approvals = payload;
    });
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export const userReducer = userSlice.reducer;
