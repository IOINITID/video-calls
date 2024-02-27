import { io } from 'socket.io-client';
import { API_URL } from '../constants';

const socket = io(API_URL, {
  transports: ['websocket'],
  reconnection: false,
});

export { socket };
