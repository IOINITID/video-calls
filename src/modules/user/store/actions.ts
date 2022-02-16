import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersService } from 'modules/user/services/get-users-service';

/**
 * Action for user authorization.
 */
export const postAuthorizationAction =
  createAction<{ email: string; password: string }>('user/postAuthorizationAction');

/**
 * Action for user authorization refresh.
 */
export const getAuthorizationRefreshAction = createAction('user/getAuthorizationRefreshAction');

/**
 * Action for user registration.
 */
export const postRegistrationAction =
  createAction<{ email: string; name: string; password: string }>('user/postRegistrationAction');

/**
 * Action for user logout.
 */
export const postLogoutAction = createAction('user/postLogoutAction');

export const getUsersAction = createAsyncThunk('user/getUsersAction', getUsersService);
