import { axiosInstance } from 'core/utils/axios-instance';
import { requestDeclineInvitationsAction, requestSentInvitationsAction } from '../store';
import { DeclineInvitationsResponse, GetInvitationsResponse, SentInvitationsResponse } from '../types';
import { ApiUrl } from './constants';

/**
 * Service для получения приглашений в друзья.
 */
export const getInvitationsService = () => {
  return axiosInstance.request<GetInvitationsResponse>({
    method: 'GET',
    url: ApiUrl.GetInvitations,
  });
};

/**
 * Service для отправки приглашения в друзей.
 */
export const sentInvitationService = (params: ReturnType<typeof requestSentInvitationsAction>['payload']) => {
  return axiosInstance.request<SentInvitationsResponse>({
    method: 'POST',
    url: ApiUrl.SentInvitation,
    data: params,
  });
};

/**
 * Service для отклонения приглашения в друзей.
 */
export const declineInvitationService = (params: ReturnType<typeof requestDeclineInvitationsAction>['payload']) => {
  return axiosInstance.request<DeclineInvitationsResponse>({
    method: 'POST',
    url: ApiUrl.DeclineInvitation,
    data: params,
  });
};
