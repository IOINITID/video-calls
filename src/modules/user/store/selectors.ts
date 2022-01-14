import { RootState } from '../../../core/store/types';

export const userIdSelector = (state: RootState) => state.user.id;
export const userEmailSelector = (state: RootState) => state.user.email;
export const userTokenSelector = (state: RootState) => state.user.token;
export const userIsAuthorizatedSelector = (state: RootState) => state.user.isAuthorizated;
export const userUsersSelector = (state: RootState) => state.user.users;
export const userFriendsSelector = (state: RootState) => state.user.friends;
export const userInvitesSelector = (state: RootState) => state.user.invites;
export const userApprovalsSelector = (state: RootState) => state.user.approvals;
export const userNameSelector = (state: RootState) => state.user.name;
export const userStatusSelector = (state: RootState) => state.user.status;
export const userIsCallSelector = (state: RootState) => state.user.isCall;
export const userIsIncomingCallSelector = (state: RootState) => state.user.isIncomingCall;
export const userIsCallAcceptedSelector = (state: RootState) => state.user.isCallAccepted;
export const userIsCallCanceledSelector = (state: RootState) => state.user.isCallCanceled;
export const userChannelsSelector = (state: RootState) => state.user.channels;
export const userChannelMessagesSelector = (state: RootState) => state.user.channelMessages;
export const userIsLoadingSelector = (state: RootState) => state.user.isLoading;
