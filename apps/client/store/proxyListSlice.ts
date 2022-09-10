import { Proxy, ProxyList } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';

const API = 'http://localhost:3333/api';
const PROXY_LIST_URL = `${API}/proxy-list`;

interface ProxyListModalData {
  name: string;
  username: string;
  password: string;
  userId: string;
}

export const fetchProxyList = createAsyncThunk(
  'proxyList/fetchProxyList',
  async () => {
    const token = localStorage.getItem('proxy-manager-token');
    const { data } = await axios.get(PROXY_LIST_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);

export const createProxyList = createAsyncThunk(
  'proxyList/createProxyList',
  async (payload: ProxyListModalData) => {
    const token = localStorage.getItem('proxy-manager-token');

    const { data } = await axios.post(PROXY_LIST_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);

export const deleteProxyList = createAsyncThunk(
  'proxyList/deleteProxyList',
  async (payload: { listKeys: string[] }) => {
    const token = localStorage.getItem('proxy-manager-token');

    await axios.delete(PROXY_LIST_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });

    return payload;
  }
);

export const editProxyList = createAsyncThunk(
  'proxyList/editProxyList',
  async (payload: ProxyList) => {
    const token = localStorage.getItem('proxy-manager-token');

    const { data } = await axios.patch(PROXY_LIST_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    [fetchProxyList.pending as any]: (state) => {
      state.status = 'loading';
    },
    [fetchProxyList.fulfilled as any]: (state, { payload }) => {
      state.list = payload;
      state.status = 'success';
    },
    [fetchProxyList.rejected as any]: (state) => {
      state.status = 'failed';
    },
    [createProxyList.fulfilled as any]: (state, { payload }) => {
      state.list.push(payload);
    },
    [deleteProxyList.fulfilled as any]: (state, { payload }) => {
      const keysSet = new Set(payload.listKeys);

      state.list = state.list.filter((list) => !keysSet.has(list.key));
    },
    [editProxyList.fulfilled as any]: (state, { payload }) => {
      const editedIndex = state.list.findIndex(
        (list) => list.key === payload.key
      );

      state.list[editedIndex] = {
        ...payload,
      };
    },
  },
});

export const getProxyList = (state: RootState) => state.proxyList.list;

export const getProxyListStatus = (state: RootState) => state.proxyList.status;

export default store.reducer;
