import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from './axios-instance';

export const getChannelMessages = createAsyncThunk(
  'user/getChannelMessages',
  async ({ channel }: { channel: string }) => {
    const response = await axiosInstance.post('/get-channel-messages', { channel });

    return response.data;
  }
);
