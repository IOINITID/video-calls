import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFriendsService } from '../services';

export const getFriendsAction = createAsyncThunk('user/getFriends', getFriendsService);
