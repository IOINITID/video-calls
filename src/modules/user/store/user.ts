import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addMessageToChannel } from 'core/services/add-message-to-channel';
import { getApprovals } from 'core/services/get-approvals';
import { getChannelMessages } from 'core/services/get-channel-messages';
import { getChannels } from 'core/services/get-channels';
import { getInvites } from 'core/services/get-invites';
import { getUsers } from 'core/services/get-users';
import { getFriendsAction } from 'modules/friends/store/actions';
import { getUsersAction } from './actions';
import { ChannelResponse, MessageResponse, UserResponse, UserState } from './types';

const initialState: UserState = {
  isAuthorizated: false,
  isLoading: false,
  id: '',
  email: '',
  name: '',
  status: '',
  token: localStorage.getItem('token') || '',
  users: [],
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
    setAuthorization: (state: UserState, { payload }: PayloadAction<boolean>) => {
      state.isAuthorizated = payload;
    },
    setIsLoading: (state: UserState, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
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
    builder.addCase(getUsers.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.users = payload;
    });
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
    builder.addCase(getUsersAction.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.users = payload;
    });
  },
});

export const { setIsLoading, setAuthorization, setIsCall, setIsIncomingCall, setIsCallAccepted, setIsCallCanceled } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
