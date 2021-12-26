import axios from 'axios';
import { AuthorizationResponse } from '../types';
import { getLogout } from './get-logout';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:8080/api',
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
        const response = await axios.get<AuthorizationResponse>('http://localhost:8080/api/refresh', {
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
