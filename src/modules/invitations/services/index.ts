import { axiosInstance } from 'core/utils/axios-instance';
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
export const sentInvitationService = (params: any) => {
  return axiosInstance.request<SentInvitationsResponse>({
    method: 'POST',
    url: ApiUrl.SentInvitation,
  });
};

/**
 * Service для отклонения приглашения в друзей.
 */
export const declineInvitationService = (params: any) => {
  return axiosInstance.request<DeclineInvitationsResponse>({
    method: 'POST',
    url: ApiUrl.DeclineInvitation,
  });
};
