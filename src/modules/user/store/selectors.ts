import { RootState } from '../../../core/store/types';

export const userUserSelector = (state: RootState) => state.user.user;
export const userUsersSelector = (state: RootState) => state.user.users;
export const userFriendsSelector = (state: RootState) => state.user.friends;
export const userInvitesSelector = (state: RootState) => state.user.invites;
export const userApprovalsSelector = (state: RootState) => state.user.approvals;
export const userIsCallSelector = (state: RootState) => state.user.isCall;
export const userIsIncomingCallSelector = (state: RootState) => state.user.isIncomingCall;
export const userIsCallAcceptedSelector = (state: RootState) => state.user.isCallAccepted;
export const userIsCallCanceledSelector = (state: RootState) => state.user.isCallCanceled;
export const userChannelsSelector = (state: RootState) => state.user.channels;
export const userChannelMessagesSelector = (state: RootState) => state.user.channelMessages;
