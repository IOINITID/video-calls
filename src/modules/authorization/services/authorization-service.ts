import { axiosInstance } from '../../../core/utils/axios-instance';
import { AuthorizationResponse } from '../../../core/types';

const authorizationService = async ({ email, password }: { email: string; password: string }) => {
  const response = await axiosInstance.post<AuthorizationResponse>('/authorization', { email, password });

  return response.data;
};

export { authorizationService };
