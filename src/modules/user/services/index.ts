import axios from 'axios';
import { axiosInstance } from 'core/utils/axios-instance';
import { postAuthorizationAction, postRegistrationAction, postUsersAction } from '../store/actions';
import { ApiUrl } from './constants';
import { Authorization, User } from './types';

/**
 * Service for user authorization.
 */
export const postAuthorizationService = (params: ReturnType<typeof postAuthorizationAction>['payload']) => {
  return axiosInstance.request<Authorization>({
    method: 'POST',
    url: ApiUrl.Authorization,
    data: params,
  });
};

/**
 * Service for user authorization refresh.
 */
export const getAuthorizationRefreshService = () => {
  return axios.request<Authorization>({
    method: 'GET',
    url: ApiUrl.AuthorizationRefresh,
    withCredentials: true,
  });
};

/**
 * Service for user registration.
 */
export const postRegistrationService = (params: ReturnType<typeof postRegistrationAction>['payload']) => {
  return axiosInstance.request<Authorization>({
    method: 'POST',
    url: ApiUrl.Registration,
    data: params,
  });
};

/**
 * Service for user logout.
 */
export const postLogoutService = () => {
  return axiosInstance.request<never>({
    method: 'GET',
    url: ApiUrl.Logout,
  });
};

/**
 * Service for getting user data.
 */
export const getUserService = () => {
  return axiosInstance.request<User>({
    method: 'GET',
    url: ApiUrl.User,
  });
};

/**
 * Service for getting user by name.
 */
export const postUsersService = (params: ReturnType<typeof postUsersAction>['payload']) => {
  return axiosInstance.request<User[]>({
    method: 'POST',
    url: '/user/users',
    data: params,
  });
};
