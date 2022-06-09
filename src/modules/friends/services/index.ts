import { axiosInstance } from 'core/utils/axios-instance';
import { AddToFriendsResponse, GetFriendsResponse, GetFriendsUsersResponse, RemoveFromFriendsResponse } from '../types';
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
 * Service для получения списка пользователей, которых можно добавить в друзья.
 */
export const getFriendsUsersService = () => {
  return axiosInstance.request<GetFriendsUsersResponse>({
    method: 'GET',
    url: ApiUrl.GetFriendsUsers,
  });
};

/**
 * Service для добавления в список друзей.
 */
export const addToFriendsService = (params: any) => {
  return axiosInstance.request<AddToFriendsResponse>({
    method: 'POST',
    url: ApiUrl.AddToFriends,
    data: params,
  });
};

/**
 * Service для удаления из списка друзей.
 */
export const removeFromFriendsService = (params: any) => {
  return axiosInstance.request<RemoveFromFriendsResponse>({
    method: 'POST',
    url: ApiUrl.RemoveFromFriends,
    data: params,
  });
};
