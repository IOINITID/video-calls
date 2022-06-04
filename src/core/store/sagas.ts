import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { userSaga } from 'modules/user/sagas';
import { authorizationModuleSaga } from 'modules/authorization/sagas';
import { friendsSaga } from 'modules/friends/sagas';

const sagas = [authorizationModuleSaga, userSaga, friendsSaga];

/**
 * Saga для всех модулей.
 */
const rootSaga = function* (): SagaIterator {
  yield all(sagas.map((saga) => fork(saga)));
};

export { rootSaga };
