import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addMessageToChannel } from 'core/services/add-message-to-channel';
import { getApprovals } from 'core/services/get-approvals';
import { getChannelMessages } from 'core/services/get-channel-messages';
import { getChannels } from 'core/services/get-channels';
import { getInvites } from 'core/services/get-invites';
import { getFriendsAction } from 'modules/friends/store/actions';
import { User } from '../services/types';
import { ChannelResponse, MessageResponse, UserResponse, UserState } from './types';

const initialState: UserState = {
  user: undefined,
  users: undefined,
  loading: {
    user: false,
  },
  error: {
    user: null,
  },
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
    successGetUserAction: (state: UserState, { payload }: PayloadAction<User>) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(getFriendsAction.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.friends = payload;
    });
    builder.addCase(getInvites.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.invites = payload;
    });
    builder.addCase(getApprovals.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.approvals = payload;
    });
    builder.addCase(getChannels.fulfilled, (state: UserState, { payload }: PayloadAction<ChannelResponse[]>) => {
      state.channels = payload;
    });
    builder.addCase(getChannelMessages.fulfilled, (state: UserState, { payload }: PayloadAction<MessageResponse[]>) => {
      state.channelMessages = payload;
    });
    builder.addCase(addMessageToChannel.fulfilled, (state: UserState, { payload }: PayloadAction<MessageResponse>) => {
      state.channelMessages = [...state.channelMessages, payload];
    });
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
} = userSlice.actions;

export const userReducer = userSlice.reducer;
