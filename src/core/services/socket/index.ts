import { API_URL } from 'core/constants';
import { io, Socket } from 'socket.io-client';

export class SocketService {
  public instance: Socket;

  constructor() {
    this.instance = io(API_URL, { transports: ['websocket'], reconnection: false });
  }

  public ping(callback: (ping: number) => void) {
    this.instance.emit('server:base:ping', Date.now());
    this.instance.once('client:base:ping', (ping: number) => {
      callback(ping);
    });
  }
}
