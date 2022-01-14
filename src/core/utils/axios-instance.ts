import axios from 'axios';
import { checkAuthorizationService } from '../services/index';
import { API_URL } from '../constants';
import { logoutService } from '../services/logout-service';

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
        const response = await checkAuthorizationService();

        localStorage.setItem('token', response.accessToken);

        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log(error);

        await logoutService();

        localStorage.removeItem('token');

        // location.href = APPLICATION_URL; // TODO: Добавить переход на авторизацию
      }
    }

    throw error;
  }
);

export { axiosInstance };
