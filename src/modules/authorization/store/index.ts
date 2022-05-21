import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
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
    requestRegistrationAction: (
      state: AuthorizationState,
      { payload }: PayloadAction<{ email: string; name: string; password: string }>
    ) => {
      state.loading.access_token = true;
    },
    successRegistrationAction: (state: AuthorizationState, { payload }: PayloadAction<Authorization>) => {
      const { access_token } = payload;

      state.access_token = access_token;
      state.loading.access_token = false;

      localStorage.setItem('access_token', access_token);
    },
    failureRegistrationAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      const getError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            return error.response.data;
          }
        }
      };

      state.error.access_token = getError(payload.error);
      state.loading.access_token = false;
    },
    requestAuthorizationAction: (
      state: AuthorizationState,
      { payload }: PayloadAction<{ email: string; password: string }>
    ) => {
      state.loading.access_token = true;
    },
    successAuthorizationAction: (state: AuthorizationState, { payload }: PayloadAction<Authorization>) => {
      const { access_token } = payload;

      state.access_token = access_token;
      state.authorizated = true;
      state.loading.access_token = false;

      localStorage.setItem('access_token', access_token);
    },
    failureAuthorizationAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      const { error } = payload;

      state.error.access_token = error;
      state.loading.access_token = false;

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message); // TODO: Добавить тип для ошибки
      } else {
        toast.error(error.message || 'Ошибка авторизации. Проверьте логин и пароль.');
      }
    },
    requestRefreshAction: (state: AuthorizationState) => {
      state.loading.access_token = true;
    },
    successRefreshAction: (state: AuthorizationState, { payload }: PayloadAction<Authorization>) => {
      const { access_token } = payload;

      state.access_token = access_token;
      state.authorizated = true;
      state.loading.access_token = false;

      localStorage.setItem('access_token', access_token);
    },
    failureRefreshAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      const { error } = payload;

      state.error.access_token = error;
      state.loading.access_token = false;

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message); // TODO: Добавить тип для ошибки
      } else {
        toast.error(error.message || 'Ошибка авторизации. Проверьте логин и пароль.');
      }
    },
    requestLogoutAction: (state: AuthorizationState) => {
      state.loading.access_token = true;
    },
    successLogoutAction: (state: AuthorizationState) => {
      state.access_token = '';
      state.authorizated = false;
      state.loading.access_token = false;

      localStorage.removeItem('access_token');
    },
    failureLogoutAction: (state: AuthorizationState, { payload }: PayloadAction<any | null>) => {
      const { error } = payload;

      state.error.access_token = error;
      state.loading.access_token = false;

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message); // TODO: Добавить тип для ошибки
      } else {
        toast.error(error.message || 'Ошибка авторизации. Проверьте логин и пароль.');
      }
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
