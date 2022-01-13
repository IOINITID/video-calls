import axios from 'axios';
import { API_URL } from '../constants';
import { AuthorizationResponse } from '../types';

const checkAuthorizationService = async () => {
  const response = await axios.get<AuthorizationResponse>(`${API_URL}/api/refresh`, { withCredentials: true });

  return response.data;
};

export { checkAuthorizationService };
