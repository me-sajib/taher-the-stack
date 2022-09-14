import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const token = localStorage.getItem('proxy-manager-token');
    const { data } = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);
