import axios from 'axios';
import { getRefreshService, postLogoutService } from 'modules/user/services';
import { API_URL } from '../constants';

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
        const response = await getRefreshService();

        localStorage.setItem('token', response.data.accessToken);

        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log(error);

        await postLogoutService();

        localStorage.removeItem('token');
      }
    }

    throw error;
  }
);

export { axiosInstance };
