import { API_URL } from 'core/constants';

export const ApiUrl = {
  Registration: 'authorization/registration',
  Authorization: 'authorization/authorization',
  Refresh: `${API_URL}/api/authorization/refresh`,
  Logout: 'authorization/logout',
};
