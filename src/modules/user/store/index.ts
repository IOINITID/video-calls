import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../services/types';
import { UserState } from './types';

const initialState: UserState = {
  user: null,
  users: [],
  loading: {
    user: false,
    users: false,
  },
  error: {
    user: null,
    users: null,
  },
  audioInDevice: '',
  audioOutDevice: '',
  // TODO: Обновление store
  friends: [],
  invites: [],
  approvals: [],
  isCall: false,
  isIncomingCall: false,
  isCallAccepted: false,
  isCallCanceled: false,
  channels: [],
  channelMessages: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // NOTE: Получение пользователя
    requestGetUserAction: (state: UserState) => {
      state.loading.user = true;
    },
    successGetUserAction: (state: UserState, { payload }: PayloadAction<User | null>) => {
      state.user = payload;
      state.loading.user = false;
    },
    failureGetUserAction: (state: UserState, { payload }: PayloadAction<any | null>) => {
      state.error.user = payload;
      state.loading.user = false;
    },
    // NOTE: Обновление пользователя
    requestUpdateUserAction: (state: UserState, { payload }: PayloadAction<Partial<User & { password: string }>>) => {
      state.loading.user = true;
    },
    successUpdateUserAction: (state: UserState, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.loading.user = false;
    },
    failureUpdateUserAction: (state: UserState, { payload }: PayloadAction<any | null>) => {
      state.error.user = payload;
      state.loading.user = false;
    },
    // NOTE: Получение списка пользователей
    requestGetUsersAction: (state: UserState) => {
      state.loading.users = true;
    },
    successGetUsersAction: (state: UserState, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
      state.loading.users = false;
    },
    failureGetUsersAction: (state: UserState, { payload }: PayloadAction<any | null>) => {
      state.error.users = payload;
      state.loading.users = false;
    },
    setIsCall: (state: UserState, { payload }: PayloadAction<boolean>) => {
      state.isCall = payload;
    },
    setIsIncomingCall: (state: UserState, { payload }: PayloadAction<boolean>) => {
      state.isIncomingCall = payload;
    },
    setIsCallAccepted: (state: UserState, { payload }: PayloadAction<boolean>) => {
      state.isCallAccepted = payload;
    },
    setIsCallCanceled: (state: UserState, { payload }: PayloadAction<boolean>) => {
      state.isCallCanceled = payload;
    },
    setAudioInDevice: (state: UserState, { payload }: PayloadAction<string>) => {
      state.audioInDevice = payload;
    },
    setAudioOutDevice: (state: UserState, { payload }: PayloadAction<string>) => {
      state.audioOutDevice = payload;
    },
  },
});

export const {
  setIsCall,
  setIsIncomingCall,
  setIsCallAccepted,
  setIsCallCanceled,
  requestGetUserAction,
  successGetUserAction,
  failureGetUserAction,
  requestUpdateUserAction,
  successUpdateUserAction,
  failureUpdateUserAction,
  setAudioInDevice,
  setAudioOutDevice,
  requestGetUsersAction,
  successGetUsersAction,
  failureGetUsersAction,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
