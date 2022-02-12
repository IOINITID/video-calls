import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { userSaga } from 'modules/user/store/sagas';

const sagas = [userSaga];

/**
 * Saga for all modules sagas.
 */
const rootSaga = function* (): SagaIterator {
  yield all(sagas.map((saga) => fork(saga)));
};

export { rootSaga };
