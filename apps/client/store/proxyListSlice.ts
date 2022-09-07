import { Proxy, ProxyList } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProxyList = createAsyncThunk(
  'proxyList/getProxyList',
  async () => {
    const token = localStorage.getItem('proxy-manager-token');
    const { data } = await axios.get(
      'http://localhost:3001/api/proxy-list?include_proxies=true',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
);

interface initialStateType {
  list: Array<ProxyList & { Proxies: Proxy[] }>;
  status: 'none' | 'loading' | 'success' | 'failed';
}

const initialState: initialStateType = {
  list: [],
  status: 'none',
};

export const store = createSlice({
  name: 'proxyList',
  initialState,
  reducers: {},
  extraReducers: {
    [getProxyList.pending as any]: (state) => {
      state.status = 'loading';
    },
    [getProxyList.fulfilled as any]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success';
    },
    [getProxyList.rejected as any]: (state) => {
      state.status = 'failed';
    },
  },
});

export default store.reducer;
