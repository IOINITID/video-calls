import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { registrationService } from '../../registration/services';
import { logoutService, serverLoadingService } from '../../../core/services';
import { getUsersService } from 'modules/user/services';

/**
 * Action for authorization.
 */
export const postAuthorizationAction =
  createAction<{ email: string; password: string }>('user/postAuthorizationAction');

/**
 * Action for authorization refresh.
 */
export const getAuthorizationRefreshAction = createAction('user/getAuthorizationRefreshAction');

export const registrationAction = createAsyncThunk('user/registrationAction', registrationService);
export const logoutAction = createAsyncThunk('user/logoutAction', logoutService);
export const serverLoadingAction = createAsyncThunk('user/serverLoadingAction', serverLoadingService);
export const getUsersAction = createAsyncThunk('user/getUsersAction', getUsersService);
