import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'modules/user/services/types';
import { axiosInstance } from '../utils/axios-instance';

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const response = await axiosInstance.get<User[]>('/users');

  return response.data;
});
