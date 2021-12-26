import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from './types';

const initialState: UserState = {
  id: '',
  email: '',
  token: localStorage.getItem('token') || '',
  isAuthorizated: false,
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
      state.token = '';
      localStorage.removeItem('token');
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export const userReducer = userSlice.reducer;
