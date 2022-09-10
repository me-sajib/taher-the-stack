import { Proxy } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';

const API = 'http://localhost:3333/api';
const PROXY_URL = `${API}/proxies`;

interface ProxyModalData {
  host: string;
  port: number;
  country: string;
  status?: string;
  proxyListKey: string;
  totalHits: number;
}

const checkProxyStatus = async (
  id: number,
  listKey: string,
  token: string
): Promise<Proxy> => {
  const {
    data: { status },
  } = await axios.get(`${API}/check-proxy/${id}?list_key=${listKey}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { data: updatedProxy } = await axios.patch(
    PROXY_URL,
    {
      id,
      status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return updatedProxy;
};

export const fetchProxies = createAsyncThunk(
  'proxies/fetchProxies',
  async (payload: { proxyListKey: string }) => {
    const token = localStorage.getItem('proxy-manager-token');
    const queryParams = new URLSearchParams(payload).toString();

    const { data } = await axios.get(`${PROXY_URL}?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);

export const createProxy = createAsyncThunk(
  'proxies/createProxy',
  async (payload: ProxyModalData) => {
    const token = localStorage.getItem('proxy-manager-token');

    payload.status = 'INACTIVE';
    payload.totalHits = 0;
    payload.port = Number(payload.port);

    const { data: proxy } = await axios.post(PROXY_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return checkProxyStatus(proxy.id, proxy.proxyListKey, token);
  }
);

export const deleteProxy = createAsyncThunk(
  'proxies/deleteProxy',
  async (payload: { proxyListKey: string; proxyIds: number[] }) => {
    const token = localStorage.getItem('proxy-manager-token');

    await axios.delete(PROXY_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });

    return payload;
  }
);

export const editProxy = createAsyncThunk(
  'proxies/editProxy',
  async (payload: Proxy) => {
    const token = localStorage.getItem('proxy-manager-token');

    const { data } = await axios.patch(PROXY_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);

export const recheckProxy = createAsyncThunk(
  'proxies/recheckProxy',
  async (payload: Proxy) => {
    const token = localStorage.getItem('proxy-manager-token');

    return checkProxyStatus(payload.id, payload.proxyListKey, token);
  }
);

interface ProxyMap {
  [proxyListKey: string]: Proxy[];
}

interface initialStateType {
  collection: ProxyMap;
  status: 'none' | 'loading' | 'success' | 'failed';
}

const initialState: initialStateType = {
  collection: {},
  status: 'none',
};

export const store = createSlice({
  name: 'proxies',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProxies.pending as any]: (state) => {
      state.status = 'loading';
    },
    [fetchProxies.fulfilled as any]: (state, { payload }) => {
      state.collection = payload.reduce((acc, cur: Proxy) => {
        if (cur.proxyListKey in acc) {
          acc[cur.proxyListKey].push(cur);
        } else {
          acc[cur.proxyListKey] = [cur];
        }

        return acc;
      }, {} as ProxyMap);

      state.status = 'success';
    },
    [fetchProxies.rejected as any]: (state) => {
      state.status = 'failed';
    },
    [createProxy.fulfilled as any]: (state, { payload }) => {
      state.collection[payload.proxyListKey].push(payload);
    },
    [deleteProxy.fulfilled as any]: (state, { payload }) => {
      const deleteIdSet = new Set(payload.proxyIds);
      const proxies: Proxy[] = state.collection[payload.proxyListKey];

      state.collection[payload.proxyListKey] = proxies.filter(
        (proxy) => !deleteIdSet.has(proxy.id)
      );
    },
    [editProxy.fulfilled as any]: (state, { payload }) => {
      const proxies = state.collection[payload.proxyListKey];
      const updatedIndex = proxies.findIndex(
        (proxy) => proxy.id === payload.id
      );

      state.collection[payload.proxyListKey][updatedIndex] = payload;
    },
    [recheckProxy.fulfilled as any]: (state, { payload }) => {
      const proxies = state.collection[payload.proxyListKey];
      const updatedIndex = proxies.findIndex(
        (proxy) => proxy.id === payload.id
      );

      state.collection[payload.proxyListKey][updatedIndex] = payload;
    },
  },
});

export const getProxies = (state: RootState) => state.proxies.collection;

export const getProxyStatus = (state: RootState) => state.proxies.status;

export default store.reducer;
