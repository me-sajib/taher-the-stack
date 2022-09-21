import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAuthorize } from 'utils';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    try {
      const { data } = await axios.get('/api/user');

      return data;
    } catch (e) {
      isAuthorize(e.response);
    }
  }
);
