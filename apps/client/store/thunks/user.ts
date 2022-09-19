import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const { data } = await axios.get('/api/user');

    return data;
  }
);
