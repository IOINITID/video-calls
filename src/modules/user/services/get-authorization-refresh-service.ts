import axios from 'axios';
import { API_URL } from '../../../core/constants';
import { AuthorizationResponse } from '../../../core/types';

/**
 * Service for authorization refresh.
 */
const getAuthorizationRefreshService = () => {
  return axios.request<AuthorizationResponse>({
    method: 'GET',
    withCredentials: true,
    url: `${API_URL}/api/refresh`,
  });
};

export { getAuthorizationRefreshService };
