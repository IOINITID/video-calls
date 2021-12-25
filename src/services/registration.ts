import { AxiosResponse } from 'axios';
import { RegistrationResponse } from '../types';
import { axiosInstance } from './axios-instance';

const registration = async (email: string, password: string): Promise<AxiosResponse<RegistrationResponse>> => {
  return axiosInstance.post<RegistrationResponse>('/registration', { email, password });
};

export { registration };
