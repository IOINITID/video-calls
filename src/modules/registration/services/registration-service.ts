import { axiosInstance } from 'core/utils/axios-instance';
import { AuthorizationResponse } from 'core/types';

const registrationService = async ({ email, name, password }: { email: string; name: string; password: string }) => {
  const response = await axiosInstance.post<AuthorizationResponse>('/registration', { email, name, password });

  return response.data;
};

export { registrationService };
