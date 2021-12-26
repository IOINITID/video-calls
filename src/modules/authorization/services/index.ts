import { AxiosResponse } from 'axios';
import { AuthorizationResponse } from '../../../core/types';
import { axiosInstance } from '../../../core/services/axios-instance';

const authorization = async (email: string, password: string): Promise<AxiosResponse<AuthorizationResponse>> => {
  return axiosInstance.post<AuthorizationResponse>('/authorization', { email, password });
};

export { authorization };
