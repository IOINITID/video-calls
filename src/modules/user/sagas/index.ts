import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  failureGetUserAction,
  failureUpdateUserAction,
  requestGetUserAction,
  requestUpdateUserAction,
  successGetUserAction,
  successUpdateUserAction,
} from '../store';
import { getUserService, updateUserService } from 'modules/user/services';

// TODO: Разделить user на profile и users

/**
 * Saga для получения данных пользователя.
 */
const getUserSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getUserService>> = yield call(getUserService);
    yield put(successGetUserAction(response.data));
  } catch (error) {
    console.error(error);
    yield put(failureGetUserAction(error));
  }
};

/**
 * Saga для обновления данных пользователя.
 */
const updateUserSaga = function* ({ payload }: ReturnType<typeof requestUpdateUserAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof updateUserService>> = yield call(updateUserService, payload);
    yield put(successUpdateUserAction(response.data));
  } catch (error) {
    console.error(error);
    yield put(failureUpdateUserAction(error));
  }
};

/**
 * Saga для получения пользователей.
 */
// const postUsersSaga = function* ({ payload }: ReturnType<typeof postUsersAction>): SagaIterator {
//   try {
//     const response: Awaited<ReturnType<typeof getUsersService>> = yield call(getUsersService, payload);
//     yield put(setUsers(response.data));
//   } catch (error) {
//     console.error(error);
//   }
// };

/**
 * Saga для модуля пользователь.
 */
const userSaga = function* (): SagaIterator {
  yield all([
    takeEvery(requestGetUserAction.type, getUserSaga),
    takeEvery(requestUpdateUserAction.type, updateUserSaga),
    // takeEvery(postUsersAction.type, postUsersSaga),
    // debounce(500, postUsersAction.type, postUsersSaga), // TODO: Подумать про debounce в 500мс для получения пользователей по имени
  ]);
};

export { userSaga };
