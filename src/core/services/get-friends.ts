import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';

export const getFriends = createAsyncThunk('user/getFriends', async () => {
  const response = await axiosInstance.get('/friends');

  return response.data;
});
