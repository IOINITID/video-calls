import axios from 'axios';
import { API_URL } from '../constants';
import { AuthorizationResponse } from '../types';
import { getLogout } from './get-logout';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const response = await axios.get<AuthorizationResponse>(`${API_URL}/api/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem('token', response.data.accessToken);

        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log(error);

        getLogout();
      }
    }

    throw error;
  }
);

export { axiosInstance };
