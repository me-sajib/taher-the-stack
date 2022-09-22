import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { fetchUserProfile } from 'store/thunks';

interface initialStateTypes {
  profile: User | null;
  status: 'none' | 'loading' | 'failed' | 'success';
}

const initialState: initialStateTypes = {
  profile: null,
  status: 'none',
};

export const store = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.status = 'success';
      });
  },
});

export const getUser = (state: RootState) => state.user.profile;
export const getUserStatus = (state: RootState) => state.user.status;

export default store.reducer;
