import { axiosInstance } from 'core/utils/axios-instance';
import { GetFriendsResponse } from '../types';
import { ApiUrl } from './constants';

/**
 * Service для получения списка друзей.
 */
export const getFriendsService = () => {
  return axiosInstance.request<GetFriendsResponse>({
    method: 'GET',
    url: ApiUrl.GetFriends,
  });
};

/**
 * Service для добавления в список друзей.
 */
export const addToFriendsService = () => {
  return axiosInstance.request<GetFriendsResponse>({
    method: 'POST',
    url: ApiUrl.GetFriends,
  });
};
