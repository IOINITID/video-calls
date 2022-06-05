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
  },
  loading: {
    invitations: false,
  },
  error: {
    invitations: null,
  },
};

export const invitationsSlice = createSlice({
  name: 'invitations',
  initialState,
  reducers: {
    // NOTE: Получение списка друзей
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
  },
});

export const { requestGetInvitationsAction, successGetInvitationsAction, failureGetInvitationsAction } =
  invitationsSlice.actions;

export const invitationsReducer = invitationsSlice.reducer;
