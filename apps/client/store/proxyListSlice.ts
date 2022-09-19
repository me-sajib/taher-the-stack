import { Proxy, ProxyList } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import {
  createProxyList,
  deleteProxyList,
  editProxyList,
  fetchProxyList,
} from 'store/thunks';

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
  extraReducers(builder) {
    builder
      .addCase(fetchProxyList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProxyList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProxyList.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.status = 'success';
      })
      .addCase(createProxyList.fulfilled, (state, { payload }) => {
        state.list.push(payload);
      })
      .addCase(deleteProxyList.fulfilled, (state, { payload }) => {
        const keysSet = new Set(payload.listKeys);

        state.list = state.list.filter((list) => !keysSet.has(list.key));
      })
      .addCase(editProxyList.fulfilled, (state, { payload }) => {
        for (const updatedList of payload) {
          const editedIndex = state.list.findIndex(
            (list) => list.key === updatedList.key
          );

          state.list[editedIndex] = {
            ...updatedList,
          };
        }
      });
  },
});

export const getProxyList = (state: RootState) => state.proxyList.list;

export const getProxyListStatus = (state: RootState) => state.proxyList.status;

export default store.reducer;
