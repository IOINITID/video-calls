import { axiosInstance } from 'core/utils/axios-instance';
import { patchUserAction, postUsersAction } from '../actions';
import { ApiUrl } from './constants';
import { User } from './types';

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
 * Service for updating user data.
 */
export const patchUserService = (params: ReturnType<typeof patchUserAction>['payload']) => {
  return axiosInstance.request<User>({
    method: 'PATCH',
    url: ApiUrl.User,
    data: params,
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
