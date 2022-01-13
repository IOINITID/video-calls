import { axiosInstance } from '../utils/axios-instance';

const serverLoadingService = async () => {
  const response = await axiosInstance.get('/');

  return response.data;
};

export { serverLoadingService };
