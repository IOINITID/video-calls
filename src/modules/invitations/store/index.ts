import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'modules/user/services/types';
import { InvitationsState } from './type';

const initialState: InvitationsState = {
  invitations: {
    sent: [],
    received: [],
  },
  status: {
    invitations: 'idle',
    sent_invitations: 'idle',
    decline_invitations: 'idle',
  },
  loading: {
    invitations: false,
    sent_invitations: false,
    decline_invitations: false,
  },
  error: {
    invitations: null,
    sent_invitations: null,
    decline_invitations: null,
  },
};

export const invitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {
    // NOTE: Получение списка приглашений в друзья
    requestGetInvitationsAction: (state: InvitationsState) => {
      state.status.invitations = 'running';
      state.loading.invitations = true;
    },
    successGetInvitationsAction: (
      state: InvitationsState,
      { payload }: PayloadAction<{ sent: User[]; received: User[] }>
    ) => {
      state.invitations = payload;
      state.status.invitations = 'success';
      state.loading.invitations = false;
      state.error.invitations = null;
    },
    failureGetInvitationsAction: (state: InvitationsState, { payload }: PayloadAction<any | null>) => {
      // const {error}= getError();
      state.status.invitations = 'error';
      state.loading.invitations = false;
      state.error.invitations = payload;
    },
    // NOTE: Отправка приглашения в друзья
    requestSentInvitationsAction: (state: InvitationsState, { payload }: PayloadAction<{ friend_id: string }>) => {
      state.status.sent_invitations = 'running';
      state.loading.sent_invitations = true;
    },
    successSentInvitationsAction: (
      state: InvitationsState,
      { payload }: PayloadAction<{ sent: User[]; received: User[] }>
    ) => {
      state.invitations = payload;
      state.status.sent_invitations = 'success';
      state.loading.sent_invitations = false;
      state.error.sent_invitations = null;
    },
    failureSentInvitationsAction: (state: InvitationsState, { payload }: PayloadAction<any | null>) => {
      // const {error}= getError();
      state.status.sent_invitations = 'error';
      state.loading.sent_invitations = false;
      state.error.sent_invitations = payload;
    },
    // NOTE: Отклонение приглашения в друзья
    requestDeclineInvitationsAction: (state: InvitationsState, { payload }: PayloadAction<{ friend_id: string }>) => {
      state.status.decline_invitations = 'running';
      state.loading.decline_invitations = true;
    },
    successDeclineInvitationsAction: (
      state: InvitationsState,
      { payload }: PayloadAction<{ sent: User[]; received: User[] }>
    ) => {
      state.invitations = payload;
      state.status.decline_invitations = 'success';
      state.loading.decline_invitations = false;
      state.error.decline_invitations = null;
    },
    failureDeclineInvitationsAction: (state: InvitationsState, { payload }: PayloadAction<any | null>) => {
      // const {error}= getError();
      state.status.decline_invitations = 'error';
      state.loading.decline_invitations = false;
      state.error.decline_invitations = payload;
    },
  },
});

export const {
  requestGetInvitationsAction,
  successGetInvitationsAction,
  failureGetInvitationsAction,
  requestSentInvitationsAction,
  successSentInvitationsAction,
  failureSentInvitationsAction,
  requestDeclineInvitationsAction,
  successDeclineInvitationsAction,
  failureDeclineInvitationsAction,
} = invitationsSlice.actions;

export const invitationsReducer = invitationsSlice.reducer;
