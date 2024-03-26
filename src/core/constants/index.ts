export const DeviceWidth = {
  Desktop: 1440,
  Tablet: 768,
  Mobile: 320,
};

export const Retina = {
  Dppx: 1.5,
  Dpi: 144,
};

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8081'
    : 'https://ioinitid-video-calls-server.herokuapp.com';

export const APPLICATION_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://ioinitid.github.io/video-calls';

export const Event = {
  Client: {
    Connect: 'client:connect',
    Disconnect: 'client:disconnect',
  },
  Server: {
    Connect: 'server:connect',
    Disconnect: 'server:disconnect',
  },
};
