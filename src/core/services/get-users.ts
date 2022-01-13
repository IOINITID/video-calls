import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserResponse } from '../../modules/user/store/types';
import { axiosInstance } from '../utils/axios-instance';

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const response = await axiosInstance.get<UserResponse[]>('/users');

  return response.data;
});
