import { User } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';

const getUserProfile = createAsyncThunk('user/getUserProfile', async () => {
  const token = localStorage.getItem('proxy-manager-token');
  const { data } = await axios.get('http://localhost:3001/api/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
});

interface initialStateTypes {
  profile: User | null;
}

const initialState: initialStateTypes = {
  profile: null,
};

export const store = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUserProfile.fulfilled as any]: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

export const getProfile = (state: RootState) => state.user.profile;

export default store.reducer;
