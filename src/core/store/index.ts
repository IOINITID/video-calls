import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../../modules/user/store';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export { store };
