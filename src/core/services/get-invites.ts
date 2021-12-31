import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';

export const getInvites = createAsyncThunk('user/getInvites', async () => {
  const response = await axiosInstance.get('/invites');

  return response.data;
});
