import {
  Proxy,
  ProxyList
} from '@prisma/client';
import { createSlice } from '@reduxjs/toolkit';
import { CheckProxyResponse } from 'interfaces';
import { RootState } from 'store';

import {
  createProxy,
  deleteProxy,
  editProxy,
  fetchProxies,
  recheckProxy
} from './thunks';

interface initialStateType {
  proxyList:
    | (ProxyList & { Proxies: Proxy[] })
    | null;
  status:
    | 'none'
    | 'loading'
    | 'success'
    | 'failed';
}

const initialState: initialStateType = {
  proxyList: null,
  status: 'none'
};

export const store = createSlice({
  name: 'proxies',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(
        fetchProxies.pending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addCase(
        fetchProxies.rejected,
        (state) => {
          state.status = 'failed';
        }
      )
      .addCase(
        fetchProxies.fulfilled,
        (state, { payload }) => {
          console.log(
            'Fetched proxies done'
          );

          if (payload) {
            state.proxyList = payload;

            state.status = 'success';
          }
        }
      )
      .addCase(
        createProxy.fulfilled,
        (state, { payload }) => {
          state.proxyList.Proxies.push(
            payload
          );
        }
      )
      .addCase(
        deleteProxy.fulfilled,
        (state, { payload }) => {
          console.log({ payload });
          const deleteIdSet = new Set(
            payload.proxyIds
          );
          const proxies: Proxy[] =
            state.proxyList.Proxies;

          state.proxyList.Proxies =
            proxies.filter(
              (proxy) =>
                !deleteIdSet.has(
                  proxy.id
                )
            );
        }
      )
      .addCase(
        editProxy.fulfilled,
        (state, { payload }) => {
          payload.forEach(
            (proxy: Proxy) => {
              const updatedIndex =
                state.proxyList.Proxies.findIndex(
                  (proxy) =>
                    proxy.id ===
                    proxy.id
                );

              state.proxyList.Proxies[
                updatedIndex
              ] = proxy;
            }
          );
        }
      )
      .addCase(
        recheckProxy.pending,
        (state, action) => {
          const checkIdSet = new Set(
            action.meta.arg as number[]
          );
          console.log(
            'Recheck pending called',
            { checkIdSet }
          );

          state.proxyList.Proxies =
            state.proxyList.Proxies.map(
              (proxy) => {
                if (
                  checkIdSet.has(
                    proxy.id
                  )
                ) {
                  proxy.status =
                    'CHECKING';
                }

                return proxy;
              }
            );
        }
      )
      .addCase(
        recheckProxy.fulfilled,
        (state, action) => {
          const checkResponse =
            action.payload as CheckProxyResponse[];
          console.log(
            'Recheck fulfilled called',
            { checkResponse }
          );

          const responseMap: Map<
            number,
            CheckProxyResponse
          > = checkResponse.reduce(
            (map, res) =>
              map.set(res.id, res),
            new Map()
          );

          state.proxyList.Proxies =
            state.proxyList.Proxies.map(
              (proxy) => {
                if (
                  responseMap.has(
                    proxy.id
                  )
                ) {
                  return {
                    ...proxy,
                    ...responseMap.get(
                      proxy.id
                    )
                  };
                }

                return proxy;
              }
            );
        }
      );
  }
});

export const getList = (
  state: RootState
) => state.proxies.proxyList;

export const getProxies = (
  state: RootState
) => state.proxies.proxyList?.Proxies;

export const getProxyStatus = (
  state: RootState
) => state.proxies.status;

export default store.reducer;
