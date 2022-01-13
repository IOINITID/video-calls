import { createAsyncThunk } from '@reduxjs/toolkit';
import { authorizationService } from '../../authorization/services';
import { registrationService } from '../../registration/services';
import { checkAuthorizationService, logoutService } from '../../../core/services';

export const authorizationAction = createAsyncThunk('user/authorizationAction', authorizationService);
export const registrationAction = createAsyncThunk('user/registrationAction', registrationService);
export const checkAuthorizationAction = createAsyncThunk('user/checkAuthorizationAction', checkAuthorizationService);
export const logoutAction = createAsyncThunk('user/logoutAction', logoutService);
