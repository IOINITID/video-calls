import { io } from 'socket.io-client';
import { API_URL } from '../constants';

const socket = io('', {
  transports: ['websocket'],
  reconnection: false,
});

export { socket };
