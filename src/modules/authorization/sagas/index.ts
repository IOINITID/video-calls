import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
  authorizationService,
  logoutService,
  refreshService,
  registrationService,
} from 'modules/authorization/services';
import {
  failureAuthorizationAction,
  failureLogoutAction,
  failureRefreshAction,
  failureRegistrationAction,
  requestAuthorizationAction,
  requestLogoutAction,
  requestRefreshAction,
  requestRegistrationAction,
  successAuthorizationAction,
  successLogoutAction,
  successRefreshAction,
  successRegistrationAction,
} from '../store';
import { successGetUserAction } from 'modules/user/store';

/**
 * Saga для регистрации пользователя.
 */
const registrationSaga = function* ({ payload }: ReturnType<typeof requestRegistrationAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof registrationService>> = yield call(registrationService, payload);
    yield put(successRegistrationAction({ access_token: response.data.access_token }));
  } catch (error) {
    console.error(error);
    yield put(failureRegistrationAction({ error }));
  }
};

/**
 * Saga для авторизации пользователя.
 */
const authorizationSaga = function* ({ payload }: ReturnType<typeof requestAuthorizationAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof authorizationService>> = yield call(authorizationService, payload);
    yield put(successAuthorizationAction({ access_token: response.data.access_token }));
  } catch (error) {
    console.error(error);
    yield put(failureAuthorizationAction({ error }));
  }
};

/**
 * Saga для обновления токенов.
 */
const refreshSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof refreshService>> = yield call(refreshService);
    yield put(successRefreshAction({ access_token: response.data.access_token }));
  } catch (error) {
    console.error(error);
    yield put(failureRefreshAction({ error }));
  }
};

/**
 * Saga для выхода из аккаунта.
 */
const logoutSaga = function* (): SagaIterator {
  try {
    yield call(logoutService);
    yield put(successLogoutAction());
    yield put(successGetUserAction(undefined));
  } catch (error) {
    console.error(error);
    yield put(failureLogoutAction({ error }));
  }
};

/**
 * Saga для модуля авторизация.
 */
const authorizationModuleSaga = function* (): SagaIterator {
  yield all([
    takeEvery(requestAuthorizationAction.type, authorizationSaga),
    takeEvery(requestRefreshAction.type, refreshSaga),
    takeEvery(requestRegistrationAction.type, registrationSaga),
    takeEvery(requestLogoutAction.type, logoutSaga),
  ]);
};

export { authorizationModuleSaga };
