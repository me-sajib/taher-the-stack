import { ProxyList } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import {
  createProxyList,
  deleteProxyList,
  editProxyList,
  fetchProxyList,
  recheckProxyList,
} from 'store/thunks';

interface Error {
  status: number;
  message: string;
}

interface initialStateType {
  list: Array<ProxyList>;
  status: 'none' | 'loading' | 'success' | 'failed';
  errors: Error[];
}

const initialState: initialStateType = {
  list: [],
  status: 'none',
  errors: [],
};

export const store = createSlice({
  name: 'proxyList',
  initialState,
  reducers: {
    clearProxyListError(state) {
      state.errors = [];
    },
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
      .addCase(deleteProxyList.fulfilled, (state, { payload }) => {
        const keysSet = new Set(payload.listKeys);

        state.list = state.list.filter((list) => !keysSet.has(list.key));
      })
      .addCase(editProxyList.fulfilled, (state, { payload }) => {
        if (payload.data) {
          for (const updatedList of payload.data) {
            const editedIndex = state.list.findIndex(
              (list) => list.key === updatedList.key
            );

            state.list[editedIndex] = {
              ...updatedList,
            };
          }
        } else {
          state.errors.push(payload.error);
        }
      })
      .addCase(recheckProxyList.pending, toggleProxyListCheckingHandler(true))
      .addCase(
        recheckProxyList.fulfilled,
        toggleProxyListCheckingHandler(false)
      );
  },
});

const toggleProxyListCheckingHandler =
  (isCheck: boolean) =>
  (state, { payload }) => {
    const { checkProxyListIds } = payload as {
      checkProxyListIds: string[];
    };
    const keySet = new Set(checkProxyListIds);

    state.list = state.list.map((proxyList) => {
      if (keySet.has(proxyList.key)) {
        proxyList.checking = isCheck;
      }

      return proxyList;
    });
  };

export const { clearProxyListError } = store.actions;

export const getProxyList = (state: RootState) => state.proxyList.list;

export const getProxyListStatus = (state: RootState) => state.proxyList.status;

export const getProxyListError = (state: RootState) => state.proxyList.errors;

export default store.reducer;
