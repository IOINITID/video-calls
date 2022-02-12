import { authorizationService } from 'modules/authorization/services';
import { call, all, takeEvery, put, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { AuthorizationResponse } from 'core/types';
import { authorizationAction } from 'modules/user/store/actions';
import { setAuthorization } from 'modules/user/store/user';

// {
//   type: string;
//   payload: { email: string; password: string };
// }

const authorizationSaga = function* (action: ReturnType<typeof authorizationAction>): SagaIterator {
  try {
    const response: AuthorizationResponse = yield call(authorizationService, {
      email: action.payload.email,
      password: action.payload.password,
    });
    yield put(setAuthorization(response));
  } catch (error) {
    console.log(error);
  }
};

const userSaga = function* (): SagaIterator {
  yield all([
    takeEvery(authorizationAction.type, authorizationSaga),
    // yield takeEvery(authorizationAction().type, authorizationSaga),
  ]);
};

const sagas = [userSaga];

const rootSaga = function* (): SagaIterator {
  yield all([
    fork(userSaga),
    // fork(userSaga)
  ]);
};

export { rootSaga };
