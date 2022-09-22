import { User } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { editUser, fetchUserProfile } from 'store/thunks';

interface Error {
  status: number;
  message: string;
}
interface initialStateTypes {
  profile: User | null;
  status: 'none' | 'loading' | 'failed' | 'success';
  errors: Error[];
}

const initialState: initialStateTypes = {
  profile: null,
  status: 'none',
  errors: [],
};

export const store = createSlice({
  name: 'user',
  initialState,
  reducers: {
    cleanUserErrors(state) {
      state.errors = [];
    },
  },
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
      })
      .addCase(editUser.fulfilled, (state, { payload }) => {
        if (payload.data) {
          state.profile = {
            ...state.profile,
            ...payload.data,
          };
          state.errors = [];
        }

        if (payload.error) {
          state.errors.push(payload.error);
        }
      });
  },
});

export const { cleanUserErrors } = store.actions;

export const getProfile = (state: RootState) => state.user.profile;
export const getUserErrors = (state: RootState) => state.user.errors;
export const getProfileStatus = (state: RootState) => state.user.status;

export default store.reducer;
