import { axiosInstance } from '../../../core/utils/axios-instance';

const getFriendsService = async () => {
  const response = await axiosInstance.get('/friends');

  return response.data;
};

export { getFriendsService };
