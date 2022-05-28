import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { socket } from 'core/utils/socket';
import { Authorization } from '../services/types';
import { AuthorizationState } from './types';

const initialState: AuthorizationState = {
  access_token: '',
  authorizated: false,
  loading: {
    access_token: false,
  },
  error: {
    access_token: null,
  },
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    /** Action для получения данных регистрации. */
    requestRegistrationAction: (
      state: AuthorizationState,
      { payload }: PayloadAction<{ email: string; name: string; password: string }>
    ) => {
      state.loading.access_token = true;
    },
    successRegistrationAction: (state: AuthorizationState, { payload }: PayloadAction<Authorization>) => {
      state.access_token = payload.access_token;
      state.authorizated = true;
      state.loading.access_token = false;
      state.error.access_token = null;

      localStorage.setItem('access_token', payload.access_token);
    },
    failureRegistrationAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      state.loading.access_token = false;
      state.error.access_token = payload.error;
    },
    /** Action для получения данных авторизации. */
    requestAuthorizationAction: (
      state: AuthorizationState,
      { payload }: PayloadAction<{ email: string; password: string }>
    ) => {
      state.loading.access_token = true;
    },
    successAuthorizationAction: (state: AuthorizationState, { payload }: PayloadAction<Authorization>) => {
      state.access_token = payload.access_token;
      state.authorizated = true;
      state.loading.access_token = false;
      state.error.access_token = null;

      localStorage.setItem('access_token', payload.access_token);
    },
    failureAuthorizationAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      state.loading.access_token = false;
      state.error.access_token = payload.error;
    },
    /** Action для обновления данных авторизации. */
    requestRefreshAction: (state: AuthorizationState) => {
      state.loading.access_token = true;
    },
    successRefreshAction: (state: AuthorizationState, { payload }: PayloadAction<Authorization>) => {
      state.access_token = payload.access_token;
      state.authorizated = true;
      state.loading.access_token = false;
      state.error.access_token = null;

      localStorage.setItem('access_token', payload.access_token);
    },
    failureRefreshAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      state.access_token = '';
      state.authorizated = false;
      state.loading.access_token = false;
      state.error.access_token = payload.error;

      localStorage.removeItem('access_token');
      socket.close();
    },
    /** Action для выхода из приложения. */
    requestLogoutAction: (state: AuthorizationState) => {
      state.loading.access_token = true;
    },
    successLogoutAction: (state: AuthorizationState) => {
      state.access_token = '';
      state.authorizated = false;
      state.loading.access_token = false;
      state.error.access_token = null;

      localStorage.removeItem('access_token');
    },
    failureLogoutAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      state.loading.access_token = false;
      state.error.access_token = payload.error;
    },
  },
});

export const {
  requestRegistrationAction,
  successRegistrationAction,
  failureRegistrationAction,
  requestAuthorizationAction,
  successAuthorizationAction,
  failureAuthorizationAction,
  requestRefreshAction,
  successRefreshAction,
  failureRefreshAction,
  requestLogoutAction,
  successLogoutAction,
  failureLogoutAction,
} = authorizationSlice.actions;

export const authorizationReducer = authorizationSlice.reducer;
