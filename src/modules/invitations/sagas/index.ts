import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { declineInvitationService, getInvitationsService, sentInvitationService } from '../services';
import { failureGetInvitationsAction, requestGetInvitationsAction, successGetInvitationsAction } from '../store';

/**
 * Saga для получения приглашений в друзья.
 */
const getInvitationsSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getInvitationsService>> = yield call(getInvitationsService);
    yield put(successGetInvitationsAction(response.data.invitations));
  } catch (error) {
    console.error(error);
    yield put(failureGetInvitationsAction(error));
  }
};

/**
 * Saga для отправки приглашения в друзей.
 */
const sentInvitationSaga = function* (payload: any): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof sentInvitationService>> = yield call(sentInvitationService, payload);
    // yield put(successGetFriendsAction(response.data.friends));
  } catch (error) {
    console.error(error);
    // yield put(failureGetFriendsAction(error));
  }
};

/**
 * Saga для отклонения приглашения в друзей.
 */
const declineInvitationSaga = function* (payload: any): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof declineInvitationService>> = yield call(
      declineInvitationService,
      payload
    );
    // yield put(successGetFriendsAction(response.data.friends));
  } catch (error) {
    console.error(error);
    // yield put(failureGetFriendsAction(error));
  }
};

/**
 * Saga для модуля приглашений в друзья.
 */
export const invitationsSaga = function* (): SagaIterator {
  yield all([
    takeEvery(requestGetInvitationsAction.type, getInvitationsSaga),
    // takeEvery(requestGetInvitationsAction.type, getInvitationsSaga),
  ]);
};
