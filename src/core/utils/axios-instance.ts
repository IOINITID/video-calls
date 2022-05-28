import axios from 'axios';
import { refreshService } from 'modules/authorization/services';
import { API_URL } from '../constants';
import { store } from 'core/store';
import { successRefreshAction, failureRefreshAction, requestRefreshAction } from 'modules/authorization/store';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${API_URL}/api`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // NOTE: Что то сделать до того как запрос отправится
    if (config.headers) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('access_token') || ''}`;
    }

    return config;
  },
  (error) => {
    // NOTE: Что то сделать с ошибкой запроса
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    // NOTE: Любой из статус кодов в диапазоне 2xx
    // NOTE: Что то сделать с данными ответа
    return config;
  },
  async (error) => {
    // NOTE: Любой из статус кодов в диапазоне за пределами 2xx
    // NOTE: Что то сделать с ошибкой ответа

    const originalConfig = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          store.dispatch(requestRefreshAction());
        } catch (error) {
          store.dispatch(failureRefreshAction(error));
        }

        return axiosInstance(originalConfig);
      }

      if (error.response.status !== 401) {
        return Promise.reject(error.response.data);
      }
    }

    return Promise.reject(error);

    // NOTE: Релизация до обновления
    // const originalConfig = error.config;

    // if (error.response.status === 401 && !isRetry) {
    //   try {
    //     const response = await refreshService();

    //     isRetry = true;

    //     store.dispatch(successRefreshAction({ access_token: response.data.access_token }));

    //     localStorage.setItem('access_token', response.data.access_token);

    //     return axiosInstance.request(originalRequest);
    //   } catch (error) {
    //     console.log(error);

    //     isRetry = false;

    //     await logoutService();

    //     localStorage.removeItem('access_token');
    //   }
    // }

    // throw error;
  }
);

export { axiosInstance };
