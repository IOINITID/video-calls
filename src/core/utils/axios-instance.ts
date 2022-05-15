import axios from 'axios';
import { refreshService, logoutService } from 'modules/authorization/services';
import { API_URL } from '../constants';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
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
        const response = await refreshService();

        localStorage.setItem('access_token', response.data.access_token);

        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log(error);

        await logoutService();

        localStorage.removeItem('access_token');
      }
    }

    throw error;
  }
);

export { axiosInstance };
