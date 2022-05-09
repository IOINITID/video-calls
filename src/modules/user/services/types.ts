/**
 * Type of response for user authorization.
 */
export type Authorization = {
  accessToken: string;
};

/**
 * Type of response for getting user data.
 */
export type User = {
  email: string;
  id: string;
  isActivated: boolean;
  name: string;
  socketId: string;
  status: 'offline' | 'online';
  default_color: string;
  description: string;
  color: string;
  image: string;
};
