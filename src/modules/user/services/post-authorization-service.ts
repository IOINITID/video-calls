import { axiosInstance } from 'core/utils/axios-instance';
import { postAuthorizationAction } from 'modules/user/store/actions';
import { ApiUrl } from 'modules/user/services/constants';
import { AuthorizationResponse } from 'modules/user/services/types';

/**
 * Service for user authorization.
 */
const postAuthorizationService = (params: ReturnType<typeof postAuthorizationAction>['payload']) => {
  return axiosInstance.request<AuthorizationResponse>({
    method: 'POST',
    url: ApiUrl.Authorization,
    data: params,
  });
};

export { postAuthorizationService };
