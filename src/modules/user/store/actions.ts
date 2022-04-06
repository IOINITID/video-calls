import { createAction } from '@reduxjs/toolkit';
import { User } from '../services/types';

/**
 * Action for user authorization.
 */
export const postAuthorizationAction =
  createAction<{ email: string; password: string }>('user/postAuthorizationAction');

/**
 * Action for user authorization refresh.
 */
export const getRefreshAction = createAction('user/getRefreshAction');

/**
 * Action for user registration.
 */
export const postRegistrationAction =
  createAction<{ email: string; name: string; password: string }>('user/postRegistrationAction');

/**
 * Action for user logout.
 */
export const postLogoutAction = createAction('user/postLogoutAction');

/**
 * Action for getting user data.
 */
export const getUserAction = createAction('user/getUserAction');

/**
 * Action for updating user data.
 */
export const patchUserAction = createAction<Partial<User & { password: string }>>('user/patchUserAction');

/**
 * Action for getting user by name.
 */
export const postUsersAction = createAction<{ searchValue: string }>('user/getUsersAction');
