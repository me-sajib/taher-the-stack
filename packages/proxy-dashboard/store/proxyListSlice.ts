import { ProxyList } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'packages/proxy-dashboard/store';
import {
  createProxyList,
  deleteProxyList,
  editProxyList,
  fetchProxyList,
  recheckProxyList
} from 'packages/proxy-dashboard/store/thunks';

interface Error {
  status: number;
  message: string;
}

interface ExtendProxyList extends ProxyList {
  totalProxy: number;
}

interface initialStateType {
  list: Array<ExtendProxyList>;
  status: 'none' | 'loading' | 'success' | 'failed';
  errors: Error[];
}

const initialState: initialStateType = {
  list: [],
  status: 'none',
  errors: []
};

export const store = createSlice({
  name: 'proxyList',
  initialState,
  reducers: {
    clearProxyListError(state) {
      state.errors = [];
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProxyList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProxyList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProxyList.fulfilled, (state, { payload }) => {
        if (payload) {
          state.list = payload;
          state.status = 'success';
        }
      })
      .addCase(createProxyList.fulfilled, (state, { payload }) => {
        if (payload.data) {
          state.errors = [];
          state.list.push(payload.data);
        } else {
          state.errors.push(payload.error);
        }
      })
      .addCase(deleteProxyList.fulfilled, (state, payload) => {
        const keysSet = new Set(payload.meta.arg.listKeys);

        state.list = state.list.filter(
          (list) => !keysSet.has(list.key)
        );
      })
      .addCase(editProxyList.fulfilled, (state, { payload }) => {
        if (payload.data) {
          for (const updatedList of payload.data) {
            const editedIndex = state.list.findIndex(
              (list) => list.key === updatedList.key
            );

            state.list[editedIndex] = {
              ...state.list[editedIndex],
              ...updatedList
            };
          }
        } else {
          state.errors.push(payload.error);
        }
      })
      .addCase(recheckProxyList.pending, (state, payload) => {
        const { checkProxyListIds } = payload.meta.arg;

        const keySet = new Set(checkProxyListIds);
        console.log({ keySet });

        state.list = state.list.map((proxyList) => {
          if (keySet.has(proxyList.key)) {
            proxyList.checking = true;
          }

          return proxyList;
        });
      })
      .addCase(recheckProxyList.fulfilled, (state, payload) => {
        const { checkProxyListIds } = payload.meta.arg;

        const keySet = new Set(checkProxyListIds);
        console.log({ keySet });

        state.list = state.list.map((proxyList) => {
          if (keySet.has(proxyList.key)) {
            proxyList.checking = false;
          }

          return proxyList;
        });
      });
  }
});

export const { clearProxyListError } = store.actions;

export const getProxyList = (state: RootState) =>
  state.proxyList.list;

export const getProxyListStatus = (state: RootState) =>
  state.proxyList.status;

export const getProxyListError = (state: RootState) =>
  state.proxyList.errors;

export default store.reducer;
