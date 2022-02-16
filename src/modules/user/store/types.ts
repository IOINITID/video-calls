export type UserState = {
  isLoading: boolean;
  isAuthorizated: boolean;
  id: string;
  email: string;
  name: string;
  status: string;
  token: string;
  users: UserResponse[];
  friends: UserResponse[];
  invites: UserResponse[];
  approvals: UserResponse[];
  isCall: boolean;
  isIncomingCall: boolean;
  isCallAccepted: boolean;
  isCallCanceled: boolean;
  channels: ChannelResponse[];
  channelMessages: MessageResponse[];
};

export type UserResponse = {
  _id: string;
  email: string;
  name: string;
  status: string;
};

export type ChannelResponse = {
  _id: string;
  title: string;
  type: 'text' | 'video';
};

export type MessageResponse = {
  _id: string;
  text: string;
  author: UserResponse;
  created: Date;
};
