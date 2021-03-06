import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from 'modules/user/store';
import { rootSaga } from 'core/store/sagas';
import { authorizationReducer } from 'modules/authorization/store';
import { friendsReducer } from 'modules/friends/store';
import { invitationsReducer } from 'modules/invitations/store';
import { meetReducer } from 'modules/meet/store';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    user: userReducer,
    friends: friendsReducer,
    invitations: invitationsReducer,
    meet: meetReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export { store };
