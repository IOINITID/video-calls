import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios-instance';

export const getChannels = createAsyncThunk('user/getChannels', async () => {
  const response = await axiosInstance.get('/get-channels');

  return response.data;
});
