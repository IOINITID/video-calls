import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { postAuthorizationAction } from './actions';
import { setAuthorization } from './user';
import { postAuthorizationService } from 'modules/user/services';

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
 * Saga for user module sagas.
 */
const userSaga = function* (): SagaIterator {
  yield all([takeEvery(postAuthorizationAction.type, postAuthorizationSaga)]);
};

export { userSaga };
