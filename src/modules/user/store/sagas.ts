import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getAuthorizationRefreshAction, postAuthorizationAction } from './actions';
import { setAuthorization } from './user';
import { getAuthorizationRefreshService, postAuthorizationService } from 'modules/user/services';

/**
 * Saga for user authorization.
 */
const postAuthorizationSaga = function* ({ payload }: ReturnType<typeof postAuthorizationAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof postAuthorizationService>> = yield call(
      postAuthorizationService,
      payload
    );
    yield put(setAuthorization(response.data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saga for user authorization.
 */
const getAuthorizationRefreshSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getAuthorizationRefreshService>> = yield call(
      getAuthorizationRefreshService
    );
    yield put(setAuthorization(response.data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saga for user module sagas.
 */
const userSaga = function* (): SagaIterator {
  yield all([
    takeEvery(postAuthorizationAction.type, postAuthorizationSaga),
    takeEvery(getAuthorizationRefreshAction.type, getAuthorizationRefreshSaga),
  ]);
};

export { userSaga };
