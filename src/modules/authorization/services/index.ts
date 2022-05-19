import axios from 'axios';
import { axiosInstance } from 'core/utils/axios-instance';
import { requestAuthorizationAction, requestRegistrationAction } from '../store';
import { ApiUrl } from './constants';
import { Authorization } from './types';

/**
 * Service для регистрации пользователя.
 */
export const registrationService = (params: ReturnType<typeof requestRegistrationAction>['payload']) => {
  return axiosInstance.request<Authorization>({
    method: 'POST',
    url: ApiUrl.Registration,
    data: params,
  });
};

/**
 * Service для авторизации пользователя.
 */
export const authorizationService = (params: ReturnType<typeof requestAuthorizationAction>['payload']) => {
  return axiosInstance.request<Authorization>({
    method: 'POST',
    url: ApiUrl.Authorization,
    data: params,
  });
};

/**
 * Service для обновления токенов.
 */
export const refreshService = () => {
  return axios.request<Authorization>({
    method: 'GET',
    url: ApiUrl.Refresh,
    withCredentials: true,
  });
};

/**
 * Service для выхода из аккаунта.
 */
export const logoutService = () => {
  return axiosInstance.request<never>({
    method: 'GET',
    url: ApiUrl.Logout,
  });
};
