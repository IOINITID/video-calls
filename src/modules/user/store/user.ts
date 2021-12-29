import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse, UserState } from './types';

const initialState: UserState = {
  id: '',
  email: '',
  token: localStorage.getItem('token') || '',
  isAuthorizated: false,
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state: UserState, { payload }: PayloadAction<{ id: string; email: string; token: string }>) => {
      state.id = payload.id;
      state.email = payload.email;
      state.token = payload.token;
      state.isAuthorizated = true;
      localStorage.setItem('token', payload.token);
    },
    setLogout: (state: UserState) => {
      state.id = '';
      state.email = '';
      state.token = '';
      state.isAuthorizated = false;
      localStorage.removeItem('token');
    },
    setUsers: (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.users = payload;
    },
  },
});

export const { setLogin, setLogout, setUsers } = userSlice.actions;

export const userReducer = userSlice.reducer;
