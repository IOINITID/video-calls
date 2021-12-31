import { RootState } from '../../../core/store/types';

export const userIdSelector = (state: RootState) => state.user.id;
export const userEmailSelector = (state: RootState) => state.user.email;
export const userTokenSelector = (state: RootState) => state.user.token;
export const userIsAuthorizatedSelector = (state: RootState) => state.user.isAuthorizated;
export const userUsersSelector = (state: RootState) => state.user.users;
export const userFriendsSelector = (state: RootState) => state.user.friends;
export const userInvitesSelector = (state: RootState) => state.user.invites;
export const userApprovalsSelector = (state: RootState) => state.user.approvals;
