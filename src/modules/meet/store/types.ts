import { User } from 'modules/user/services/types';

export type MeetState = {
  meet: {
    user: User | null;
    isInitiator: boolean;
  };
  meetState: RTCIceConnectionState;
};
