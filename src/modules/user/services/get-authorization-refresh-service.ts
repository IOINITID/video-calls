import axios from 'axios';
import { AuthorizationResponse } from '../../../core/types';
import { ApiUrl } from './constants';

/**
 * Service for authorization refresh.
 */
const getAuthorizationRefreshService = () => {
  return axios.request<AuthorizationResponse>({
    method: 'GET',
    withCredentials: true,
    url: ApiUrl.AuthorizationRefresh,
  });
};

export { getAuthorizationRefreshService };
