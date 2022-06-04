import { User } from '../services/types';

export type UserState = {
  user: User | null;
  users: User[];
  loading: {
    user: boolean;
    users: boolean;
  };
  error: {
    user: any | null;
    users: any | null;
  };
  audioInDevice: string;
  audioOutDevice: string;
  // NOTE: Нужно доделать остальные данные
  friends: User[];
  invites: User[];
  approvals: User[];
  isCall: boolean;
  isIncomingCall: boolean;
  isCallAccepted: boolean;
  isCallCanceled: boolean;
  channels: ChannelResponse[];
  channelMessages: MessageResponse[];
};

export type ChannelResponse = {
  _id: string;
  title: string;
  type: 'text' | 'video';
};

export type MessageResponse = {
  _id: string;
  text: string;
  author: User;
  created: Date;
};
