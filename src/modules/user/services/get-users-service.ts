import { axiosInstance } from '../../../core/utils/axios-instance';
import { UserResponse } from '../store/types';

const getUsersService = async ({ searchValue }: { searchValue: string }) => {
  const response = await axiosInstance.post<UserResponse[]>('/users', { searchValue });

  return response.data;
};

export { getUsersService };
