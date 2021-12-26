import { axiosInstance } from './axios-instance';

const logout = async (): Promise<void> => {
  return axiosInstance.post('/logout');
};

export { logout };
