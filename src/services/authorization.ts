import { AxiosResponse } from 'axios';
import { AuthorizationResponse } from '../types';
import { axiosInstance } from './axios-instance';

const authorization = async (email: string, password: string): Promise<AxiosResponse<AuthorizationResponse>> => {
  return axiosInstance.post<AuthorizationResponse>('/authorization', { email, password });
};

export { authorization };
