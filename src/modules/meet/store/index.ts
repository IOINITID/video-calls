import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'modules/user/services/types';
import { MeetState } from './types';

const initialState: MeetState = {
  meet: {
    user: null,
    isInitiator: false,
  },
  meetState: 'new',
};

export const meetSlice = createSlice({
  name: 'meet',
  initialState,
  reducers: {
    // NOTE: Получение пользователя которому звоним
    setMeetAction: (
      state: MeetState,
      { payload }: PayloadAction<{ user: User | null; isInitiator: boolean; meetState?: RTCIceConnectionState }>
    ) => {
      state.meet.user = payload.user;
      state.meet.isInitiator = payload.isInitiator;
    },
    setMeetStateAction: (state: MeetState, { payload }: PayloadAction<{ meetState: RTCIceConnectionState }>) => {
      state.meetState = payload.meetState;
    },
  },
});

export const { setMeetAction, setMeetStateAction } = meetSlice.actions;

export const meetReducer = meetSlice.reducer;
