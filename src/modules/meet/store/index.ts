import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'modules/user/services/types';
import { MeetState } from './types';

const initialState: MeetState = {
  meet: {
    user: null,
    isInitiator: false,
  },
};

export const meetSlice = createSlice({
  name: 'meet',
  initialState,
  reducers: {
    // NOTE: Получение пользователя которому звоним
    setMeetAction: (state: MeetState, { payload }: PayloadAction<{ user: User | null; isInitiator: boolean }>) => {
      state.meet.user = payload.user;
      state.meet.isInitiator = payload.isInitiator;
    },
  },
});

export const { setMeetAction } = meetSlice.actions;

export const meetReducer = meetSlice.reducer;
