import { createAction } from '@reduxjs/toolkit';

/**
 * Action для регистрации пользователя.
 */
export const requestRegistrationAction = createAction<{ email: string; name: string; password: string }>(
  'authorization/requestRegistrationAction'
);

/**
 * Action для авторизации пользователя.
 */
export const requestAuthorizationAction = createAction<{ email: string; password: string }>(
  'authorization/requestAuthorizationAction'
);

/**
 * Action для обновления токенов.
 */
export const requestRefreshAction = createAction('authorization/requestRefreshAction');

/**
 * Action для выхода из аккаунта.
 */
export const requestLogoutAction = createAction('authorization/requestLogoutAction');
