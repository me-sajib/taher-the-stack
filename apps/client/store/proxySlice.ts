import { Proxy, ProxyStatus } from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { CheckProxyPayload, CheckProxyResponse } from 'interfaces';
import { RootState } from 'store';
import {
  createProxy,
  deleteProxy,
  editProxy,
  fetchProxies,
  recheckProxy,
} from './thunks';

interface ProxyMap {
  [proxyListKey: string]: Proxy[];
}

interface initialStateType {
  collection: ProxyMap;
  checkingProxyIds: number[];
  status: 'none' | 'loading' | 'success' | 'failed';
}

const initialState: initialStateType = {
  collection: {},
  checkingProxyIds: [],
  status: 'none',
};

export const store = createSlice({
  name: 'proxies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProxies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProxies.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchProxies.fulfilled, (state, { payload }) => {
        console.log('Fetched proxies done');

        state.collection = payload.reduce((acc: ProxyMap, cur: Proxy) => {
          if (cur.proxyListKey in acc) {
            acc[cur.proxyListKey].push(cur);
          } else {
            acc[cur.proxyListKey] = [cur];
          }

          return acc;
        }, {} as ProxyMap);

        state.status = 'success';
      })
      .addCase(createProxy.fulfilled, (state, { payload }) => {
        const { proxyListKey } = payload;

        if (state.collection[proxyListKey]) {
          state.collection[proxyListKey].push(payload);
        } else {
          state.collection[proxyListKey] = [payload];
        }
      })
      .addCase(deleteProxy.fulfilled, (state, { payload }) => {
        const deleteIdSet = new Set(payload.proxyIds);
        const proxies: Proxy[] = state.collection[payload.proxyListKey];

        state.collection[payload.proxyListKey] = proxies.filter(
          (proxy) => !deleteIdSet.has(proxy.id)
        );
      })
      .addCase(editProxy.fulfilled, (state, { payload }) => {
        const proxies = state.collection[payload.proxyListKey];
        const updatedIndex = proxies.findIndex(
          (proxy) => proxy.id === payload.id
        );

        state.collection[payload.proxyListKey][updatedIndex] = payload;
      })
      .addCase(recheckProxy.pending, (state, action) => {
        const checkPayload = action.meta.arg as CheckProxyPayload[];
        console.log('Recheck pending called', { checkPayload });
        const checkProxyIdSet = checkPayload.reduce((set, payload) => {
          payload.ids ??= state.collection[payload.listKey].map(
            (proxy) => proxy.id
          );

          for (const id of payload.ids) {
            set.add(id);
          }

          return set;
        }, new Set());

        for (const listKey in state.collection) {
          state.collection[listKey] = state.collection[listKey].map((proxy) => {
            if (checkProxyIdSet.has(proxy.id)) {
              proxy.status = 'CHECKING';
            }
            return proxy;
          });
        }

        console.log(state.collection);
      })
      .addCase(recheckProxy.fulfilled, (state, action) => {
        const checkResponse = action.payload as CheckProxyResponse[];
        console.log('Recheck fulfilled called', { checkResponse });

        for (const { listKey, responseStatusList } of checkResponse) {
          const idMap = responseStatusList.reduce(
            (acc, cur) =>
              acc.set(cur.id, {
                status: cur.status,
                lastCheckAt: cur.lastCheckAt,
              }),
            new Map<
              number,
              {
                status: ProxyStatus;
                lastCheckAt: Date;
              }
            >()
          );

          state.collection[listKey] = state.collection[listKey].map((proxy) => {
            if (idMap.has(proxy.id)) {
              proxy.status = idMap.get(proxy.id).status;
              proxy.lastCheckAt = idMap.get(proxy.id).lastCheckAt;
            }

            return proxy;
          });
        }
      });
  },
});

export const getProxies = (state: RootState) => state.proxies.collection;

export const getProxyStatus = (state: RootState) => state.proxies.status;

export default store.reducer;
