import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { authorizationService } from '../../authorization/services';
import { registrationService } from '../../registration/services';
import { checkAuthorizationService, logoutService, serverLoadingService } from '../../../core/services';
import { getUsersService } from '../services';

// export const authorizationAction = createAsyncThunk('user/authorizationAction', authorizationService);
// export const authorizationAction = (payload: { email: string; password: string }) => {
//   return {
//     type: 'user/authorizationAction',
//     payload,
//   };
// };

export const authorizationAction = createAction<{ email: string; password: string }>('user/authorizationAction');

export const registrationAction = createAsyncThunk('user/registrationAction', registrationService);
export const checkAuthorizationAction = createAsyncThunk('user/checkAuthorizationAction', checkAuthorizationService);
export const logoutAction = createAsyncThunk('user/logoutAction', logoutService);
export const serverLoadingAction = createAsyncThunk('user/serverLoadingAction', serverLoadingService);
export const getUsersAction = createAsyncThunk('user/getUsersAction', getUsersService);
