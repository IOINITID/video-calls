import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';

export const addMessageToChannel = createAsyncThunk(
  'user/addMessageToChannel',
  async ({ channel, message }: { channel: string; message: string }) => {
    const response = await axiosInstance.post('/add-message-to-channel', { channel, message });

    return response.data;
  }
);
