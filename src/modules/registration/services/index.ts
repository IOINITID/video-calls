import { AxiosResponse } from 'axios';
import { RegistrationResponse } from '../../../core/types';
import { axiosInstance } from '../../../core/services/axios-instance';

const registration = async (
  email: string,
  name: string,
  password: string
): Promise<AxiosResponse<RegistrationResponse>> => {
  return axiosInstance.post<RegistrationResponse>('/registration', { email, name, password });
};

export { registration };
