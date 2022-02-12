import { axiosInstance } from 'core/utils/axios-instance';
import { AuthorizationResponse } from 'core/types';
import { postAuthorizationAction } from 'modules/user/store/actions';
import { ApiUrl } from 'modules/user/services/constants';

/**
 * Service for user authorization.
 */
const postAuthorizationService = (params: ReturnType<typeof postAuthorizationAction>['payload']) => {
  return axiosInstance.request<AuthorizationResponse>({
    method: 'POST',
    data: params,
    url: ApiUrl.Authorization,
  });
};

export { postAuthorizationService };
