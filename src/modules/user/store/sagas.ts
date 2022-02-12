import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getAuthorizationRefreshAction, getServerStatusAction, postAuthorizationAction } from './actions';
import { setAuthorization, setUserIsLoading } from './user';
import {
  getAuthorizationRefreshService,
  postAuthorizationService,
  getServerStatusService,
} from 'modules/user/services';
import { toast } from 'react-toastify';

/**
 * Saga for getting server status.
 */
const getServerStatusSaga = function* (): SagaIterator {
  try {
    yield put(setUserIsLoading(true));
    const response: Awaited<ReturnType<typeof getServerStatusService>> = yield call(getServerStatusService);
    if (response.data.status === 'online') {
      yield put(setUserIsLoading(false));
    }
  } catch (error) {
    console.error(error);
    yield put(setUserIsLoading(false));
    toast.error('Сервер недоступен в данный момент. Повторите позже.');
  }
};

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
    takeEvery(getServerStatusAction.type, getServerStatusSaga),
    takeEvery(postAuthorizationAction.type, postAuthorizationSaga),
    takeEvery(getAuthorizationRefreshAction.type, getAuthorizationRefreshSaga),
  ]);
};

export { userSaga };
