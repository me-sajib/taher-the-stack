import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { fetchUserProfile } from 'store/thunks';

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
  extraReducers(builder) {
    builder.addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
      state.profile = payload;
    });
  },
});

export const getProfile = (state: RootState) => state.user.profile;

export default store.reducer;
