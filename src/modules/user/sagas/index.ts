import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { getUserAction, patchUserAction, postUsersAction } from '../actions';
import { setUser, setUsers } from '../store/user';
import { getUserService, patchUserService, postUsersService } from 'modules/user/services';

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
    takeEvery(getUserAction.type, getUserSaga),
    takeEvery(patchUserAction.type, patchUserSaga),
    takeEvery(postUsersAction.type, postUsersSaga),
    // debounce(500, postUsersAction.type, postUsersSaga), // TODO: Подумать про debounce в 500мс для получения пользователей по имени
  ]);
};

export { userSaga };
