import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../utils/axios-instance';

export const getApprovals = createAsyncThunk('user/getApprovals', async () => {
  const response = await axiosInstance.get('/approvals');

  return response.data;
});
