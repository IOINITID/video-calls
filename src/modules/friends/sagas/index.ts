import { all, call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  failureAddToFriendsAction,
  failureGetFriendsAction,
  failureGetFriendsUsersAction,
  failureRemoveFromFriendsAction,
  requestAddToFriendsAction,
  requestGetFriendsAction,
  requestGetFriendsUsersAction,
  requestRemoveFromFriendsAction,
  successAddToFriendsAction,
  successGetFriendsAction,
  successGetFriendsUsersAction,
  successRemoveFromFriendsAction,
} from '../store';
import { addToFriendsService, getFriendsService, getFriendsUsersService, removeFromFriendsService } from '../services';
import { socket } from 'core/utils/socket';
import { Event } from '../constants';

/**
 * Saga для получения списка друзей.
 */
const getFriendsSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getFriendsService>> = yield call(getFriendsService);
    yield put(successGetFriendsAction(response.data.friends));
  } catch (error) {
    console.error(error);
    yield put(failureGetFriendsAction(error));
  }
};

/**
 * Saga для получения списка пользователей, которых можно добавить в друзья.
 */
const getFriendsUsersSaga = function* (): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof getFriendsUsersService>> = yield call(getFriendsUsersService);
    yield put(successGetFriendsUsersAction(response.data.friends_users));
  } catch (error) {
    console.error(error);
    yield put(failureGetFriendsUsersAction(error));
  }
};

/**
 * Saga для добавления в спискок друзей.
 */
const addToFriendsSaga = function* ({ payload }: ReturnType<typeof requestAddToFriendsAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof addToFriendsService>> = yield call(addToFriendsService, payload);
    yield put(successAddToFriendsAction(response.data.friends));

    // NOTE: Отправка события добавления в друзья
    socket.emit(Event.Client.AddToFriends, payload.friend_id);
  } catch (error) {
    console.error(error);
    yield put(failureAddToFriendsAction(error));
  }
};

/**
 * Saga для удаления из списка друзей.
 */
const removeFromFriendsSaga = function* ({ payload }: ReturnType<typeof requestRemoveFromFriendsAction>): SagaIterator {
  try {
    const response: Awaited<ReturnType<typeof removeFromFriendsService>> = yield call(
      removeFromFriendsService,
      payload
    );
    yield put(successRemoveFromFriendsAction(response.data.friends));

    // NOTE: Отправка события для удаления из друзей
    socket.emit(Event.Client.RemoveFromFriends, payload.friend_id);
  } catch (error) {
    console.error(error);
    yield put(failureRemoveFromFriendsAction(error));
  }
};

/**
 * Saga для модуля друзья.
 */
export const friendsSaga = function* (): SagaIterator {
  yield all([
    takeEvery(requestGetFriendsAction.type, getFriendsSaga),
    takeEvery(requestGetFriendsUsersAction.type, getFriendsUsersSaga),
    takeEvery(requestAddToFriendsAction.type, addToFriendsSaga),
    takeEvery(requestRemoveFromFriendsAction.type, removeFromFriendsSaga),
  ]);
};
