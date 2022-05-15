import { createAction } from '@reduxjs/toolkit';
import { User } from '../services/types';

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
