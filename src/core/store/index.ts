import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from 'modules/user/store';
import { rootSaga } from 'core/store/sagas';
import { authorizationReducer } from 'modules/authorization/store';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    user: userReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export { store };
