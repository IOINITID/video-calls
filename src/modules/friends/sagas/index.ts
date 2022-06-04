import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { failureGetFriendsAction, requestGetFriendsAction, successGetFriendsAction } from '../store';
import { getFriendsService } from '../services';

/**
 * Saga для получения списка друзей.
 */
const getFriendsSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getFriendsService>> = yield call(getFriendsService);
    yield put(successGetFriendsAction(response.data.friends));
  } catch (error) {
    console.error(error);
    yield put(failureGetFriendsAction(error));
  }
};

/**
 * Saga для модуля друзья.
 */
export const friendsSaga = function* (): SagaIterator {
  yield all([takeEvery(requestGetFriendsAction.type, getFriendsSaga)]);
};
