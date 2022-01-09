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
    ? 'http://localhost:8080'
    : 'https://ioinitid-video-calls-server.herokuapp.com';
