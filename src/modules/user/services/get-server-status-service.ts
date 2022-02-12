import { axiosInstance } from 'core/utils/axios-instance';
import { ApiUrl } from './constants';

/**
 * Service for getting server status.
 */
const getServerStatusService = () => {
  return axiosInstance.request<{ status: 'online' }>({
    method: 'GET',
    url: ApiUrl.ServerStatus,
  });
};

export { getServerStatusService };
