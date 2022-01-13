import { axiosInstance } from '../utils/axios-instance';

const logoutService = async () => {
  await axiosInstance.post('/logout');
};

export { logoutService };
