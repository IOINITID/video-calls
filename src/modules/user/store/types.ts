export type UserState = {
  id: string;
  email: string;
  name: string;
  token: string;
  isAuthorizated: boolean;
  users: UserResponse[];
  friends: UserResponse[];
  invites: UserResponse[];
  approvals: UserResponse[];
  isCall: boolean;
  isIncomingCall: boolean;
  isCallAccepted: boolean;
  isCallCanceled: boolean;
};

export type UserResponse = {
  _id: string;
  email: string;
  name: string;
  status: string;
};
