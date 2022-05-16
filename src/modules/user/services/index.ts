import { axiosInstance } from 'core/utils/axios-instance';
import { requestUpdateUserAction } from '../store';
import { ApiUrl } from './constants';
import { User } from './types';

/**
 * Service для получения данных пользователя.
 */
export const getUserService = () => {
  return axiosInstance.request<User>({
    method: 'GET',
    url: ApiUrl.User,
  });
};

/**
 * Service для обновления данных пользователя.
 */
export const updateUserService = (params: ReturnType<typeof requestUpdateUserAction>['payload']) => {
  return axiosInstance.request<User>({
    method: 'PATCH',
    url: ApiUrl.User,
    data: params,
  });
};

/**
 * Service для получения пользователей.
 */
// export const getUsersService = (params: ReturnType<typeof postUsersAction>['payload']) => {
//   return axiosInstance.request<User[]>({
//     method: 'POST', // TODO: Заменить метод на GET
//     url: '/user/users',
//     data: params,
//   });
// };
