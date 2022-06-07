import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { declineInvitationService, getInvitationsService, sentInvitationService } from '../services';
import {
  failureDeclineInvitationsAction,
  failureGetInvitationsAction,
  failureSentInvitationsAction,
  requestDeclineInvitationsAction,
  requestGetInvitationsAction,
  requestSentInvitationsAction,
  successDeclineInvitationsAction,
  successGetInvitationsAction,
  successSentInvitationsAction,
} from '../store';
import { socket } from 'core/utils/socket';
import { Event } from '../constants';

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
const sentInvitationSaga = function* ({ payload }: ReturnType<typeof requestSentInvitationsAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof sentInvitationService>> = yield call(sentInvitationService, payload);
    yield put(successSentInvitationsAction(response.data.invitations));

    // NOTE: Отправка сигналинга для отправки приглашения в друзья
    socket.emit(Event.Client.SentInvitation, payload.friend_id);
  } catch (error) {
    console.error(error);
    yield put(failureSentInvitationsAction(error));
  }
};

/**
 * Saga для отклонения приглашения в друзей.
 */
const declineInvitationSaga = function* ({
  payload,
}: ReturnType<typeof requestDeclineInvitationsAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof declineInvitationService>> = yield call(
      declineInvitationService,
      payload
    );
    yield put(successDeclineInvitationsAction(response.data.invitations));

    // NOTE: Отправка сигналинга для отмены приглашения в друзья
    socket.emit(Event.Client.DeclineInvitation, payload.friend_id);
  } catch (error) {
    console.error(error);
    yield put(failureDeclineInvitationsAction(error));
  }
};

/**
 * Saga для модуля приглашения в друзья.
 */
export const invitationsSaga = function* (): SagaIterator {
  yield all([
    takeEvery(requestGetInvitationsAction.type, getInvitationsSaga),
    takeEvery(requestSentInvitationsAction.type, sentInvitationSaga),
    takeEvery(requestDeclineInvitationsAction.type, declineInvitationSaga),
  ]);
};
