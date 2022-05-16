import { User } from '../services/types';

export type UserState = {
  user: User | undefined;
  users: User[] | undefined;
  loading: {
    user: boolean;
  };
  error: {
    user: any | null;
  };
  // NOTE: Нужно доделать остальные данные
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
