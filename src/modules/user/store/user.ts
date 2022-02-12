import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addMessageToChannel } from '../../../core/services/add-message-to-channel';
import { getApprovals } from '../../../core/services/get-approvals';
import { getChannelMessages } from '../../../core/services/get-channel-messages';
import { getChannels } from '../../../core/services/get-channels';
import { getInvites } from '../../../core/services/get-invites';
import { getUsers } from '../../../core/services/get-users';
import { AuthorizationResponse } from '../../../core/types';
import { getFriendsAction } from '../../friends/store/actions';
import {
  authorizationAction,
  checkAuthorizationAction,
  getUsersAction,
  logoutAction,
  registrationAction,
  serverLoadingAction,
} from './actions';
import { ChannelResponse, MessageResponse, UserResponse, UserState } from './types';

const initialState: UserState = {
  id: '',
  email: '',
  name: '',
  status: '',
  token: localStorage.getItem('token') || '',
  isAuthorizated: false,
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
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorization: (state: UserState, { payload }: PayloadAction<AuthorizationResponse>) => {
      state.id = payload.user.id;
      state.email = payload.user.email;
      state.name = payload.user.name;
      state.status = payload.user.status;
      state.token = payload.accessToken;
      state.isAuthorizated = true;
      localStorage.setItem('token', payload.accessToken);
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
    // builder.addCase(
    //   authorizationAction.fulfilled,
    //   (state: UserState, { payload }: PayloadAction<AuthorizationResponse>) => {
    //     state.id = payload.user.id;
    //     state.email = payload.user.email;
    //     state.name = payload.user.name;
    //     state.status = payload.user.status;
    //     state.token = payload.accessToken;
    //     state.isAuthorizated = true;
    //     localStorage.setItem('token', payload.accessToken);
    //   }
    // );
    builder.addCase(
      registrationAction.fulfilled,
      (state: UserState, { payload }: PayloadAction<AuthorizationResponse>) => {
        state.id = payload.user.id;
        state.email = payload.user.email;
        state.name = payload.user.name;
        state.status = payload.user.status;
        state.token = payload.accessToken;
        state.isAuthorizated = true;
        localStorage.setItem('token', payload.accessToken);
      }
    );
    builder.addCase(
      checkAuthorizationAction.fulfilled,
      (state: UserState, { payload }: PayloadAction<AuthorizationResponse>) => {
        state.id = payload.user.id;
        state.email = payload.user.email;
        state.name = payload.user.name;
        state.status = payload.user.status;
        state.token = payload.accessToken;
        state.isAuthorizated = true;
        localStorage.setItem('token', payload.accessToken);
      }
    );
    builder.addCase(logoutAction.fulfilled, (state: UserState) => {
      state.id = '';
      state.email = '';
      state.name = '';
      state.token = '';
      state.status = '';
      state.isAuthorizated = false;
      localStorage.removeItem('token');
    });
    builder.addCase(serverLoadingAction.pending, (state: UserState) => {
      state.isLoading = true;
    });
    builder.addCase(serverLoadingAction.fulfilled, (state: UserState) => {
      state.isLoading = false;
    });
    builder.addCase(getUsersAction.fulfilled, (state: UserState, { payload }: PayloadAction<UserResponse[]>) => {
      state.users = payload;
    });
  },
});

export const { setAuthorization, setIsCall, setIsIncomingCall, setIsCallAccepted, setIsCallCanceled } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
