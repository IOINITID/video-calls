import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  getRefreshAction,
  getUserAction,
  patchUserAction,
  postAuthorizationAction,
  postLogoutAction,
  postRegistrationAction,
  postUsersAction,
} from './actions';
import { setAuthorization, setIsLoading, setUser, setUsers } from './user';
import {
  getRefreshService,
  getUserService,
  patchUserService,
  postAuthorizationService,
  postLogoutService,
  postRegistrationService,
  postUsersService,
} from 'modules/user/services';
import { toast } from 'react-toastify';
import axios from 'axios';

/**
 * Saga for user authorization.
 */
const postAuthorizationSaga = function* ({ payload }: ReturnType<typeof postAuthorizationAction>): SagaIterator {
  try {
    yield put(setIsLoading(true));
    const response: Awaited<ReturnType<typeof postAuthorizationService>> = yield call(
      postAuthorizationService,
      payload
    );
    yield put(setIsLoading(false));
    yield put(setAuthorization(true));
    localStorage.setItem('token', response.data.accessToken);
  } catch (error) {
    console.error(error);
    yield put(setIsLoading(false));
    if (axios.isAxiosError(error)) {
      return toast.error(error.response?.data.message); // TODO: Добавить тип для ошибки
    }
    toast.error('Ошибка авторизации. Проверьте логин и пароль.');
  }
};

/**
 * Saga for user authorization refresh.
 */
const getRefreshSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getRefreshService>> = yield call(getRefreshService);
    yield put(setAuthorization(true));
    localStorage.setItem('token', response.data.accessToken);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saga for user registration.
 */
const postRegistrationSaga = function* ({ payload }: ReturnType<typeof postRegistrationAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof postRegistrationService>> = yield call(postRegistrationService, payload);
    yield put(setAuthorization(true));
    localStorage.setItem('token', response.data.accessToken);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saga for user logout.
 */
const postLogoutSaga = function* (): SagaIterator {
  try {
    yield call(postLogoutService);
    yield put(setAuthorization(false));
    localStorage.removeItem('token');
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saga for getting user data.
 */
const getUserSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getUserService>> = yield call(getUserService);
    yield put(setUser(response.data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saga for updating user data.
 */
const patchUserSaga = function* ({ payload }: ReturnType<typeof patchUserAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof patchUserService>> = yield call(patchUserService, payload);
    yield put(setUser(response.data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * Saga for getting user by name.
 */
const postUsersSaga = function* ({ payload }: ReturnType<typeof postUsersAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof postUsersService>> = yield call(postUsersService, payload);
    yield put(setUsers(response.data));
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
    takeEvery(getRefreshAction.type, getRefreshSaga),
    takeEvery(postRegistrationAction.type, postRegistrationSaga),
    takeEvery(postLogoutAction.type, postLogoutSaga),
    takeEvery(getUserAction.type, getUserSaga),
    takeEvery(patchUserAction.type, patchUserSaga),
    takeEvery(postUsersAction.type, postUsersSaga),
    // debounce(500, postUsersAction.type, postUsersSaga), // TODO: Подумать про debounce в 500мс для получения пользователей по имени
  ]);
};

export { userSaga };