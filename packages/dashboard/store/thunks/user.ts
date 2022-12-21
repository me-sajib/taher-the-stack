import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { isAuthorize } from 'packages/dashboard/utils';

export const fetchUserProfile =
  createAsyncThunk(
    'user/fetchUserProfile',
    async () => {
      try {
        const { data } =
          await axios.get('/api/user');

        return data;
      } catch (e) {
        isAuthorize(e.response);
      }
    }
  );

export const editUser =
  createAsyncThunk(
    'user/editUser',
    async (payload: any) => {
      try {
        const { data } =
          await axios.patch(
            '/api/user/update',
            payload
          );

        if (
          data.status &&
          data.status !== 200
        ) {
          return {
            error: {
              status: data.status,
              message: data.message
            }
          };
        }

        return { data };
      } catch (e) {
        isAuthorize(e.response);
      }
    }
  );
