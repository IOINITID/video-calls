import { API_URL } from 'core/constants';

export const ApiUrl = {
  Authorization: 'user/authorization',
  AuthorizationRefresh: `${API_URL}/api/user/refresh`,
  Registration: 'user/registration',
  Logout: 'user/logout',
  User: 'user/user',
};
