import { Proxy, ProxyStatus } from '@prisma/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store';
import mainStore from './index';

const PROXY_URL = `/api/proxies`;

interface ProxyModalData {
  host: string;
  port: number;
  country: string;
  status?: string;
  proxyListKey: string;
  totalHits: number;
}

interface ProxyResponse {
  id: number;
  lastCheckAt: Date;
  status: ProxyStatus;
}
interface CheckProxyResponse {
  listKey: string;
  responseStatusList: ProxyResponse[];
}
interface CheckProxyPayload {
  listKey: string;
  ids?: number[];
}

const checkProxyStatus = async (
  checkList: CheckProxyPayload[]
): Promise<CheckProxyResponse[]> => {
  const token = localStorage.getItem('proxy-manager-token');

  const { data } = await axios.post(
    `/api/check-proxy`,
    { checkList },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const fetchProxies = createAsyncThunk(
  'proxies/fetchProxies',
  async (payload: { proxyListKey: string }) => {
    const token = localStorage.getItem('proxy-manager-token');
    const queryParams = new URLSearchParams(payload).toString();

    try {
      const { data } = await axios.get(`${PROXY_URL}?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (e) {
      return [];
    }
  }
);

export const createProxy = createAsyncThunk(
  'proxies/createProxy',
  async (payload: ProxyModalData) => {
    const token = localStorage.getItem('proxy-manager-token');

    payload.status = 'CHECKING';
    payload.totalHits = 0;
    payload.port = Number(payload.port);

    const { data: proxy } = await axios.post(PROXY_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return proxy;
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
  async (payload: any) => {
    const token = localStorage.getItem('proxy-manager-token');
    if ('port' in payload) {
      payload.port = Number(payload.port);
    }

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
  async (payload: CheckProxyPayload[]) => {
    return checkProxyStatus(payload);
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
  reducers: {
    updateToChecking(state, { payload }) {
      const { proxyListKey, id } = payload;
      const proxyIndex = state.collection[proxyListKey].findIndex(
        (proxy) => proxy.id === id
      );
      state.collection[proxyListKey][proxyIndex].status = 'CHECKING';
    },
    updateToBulkChecking(state, action) {
      const checkProxies = action.payload as CheckProxyPayload[];

      for (const payload of checkProxies) {
        const { listKey, ids = [] } = payload;

        if (ids.length === 0) {
          ids.push(...state.collection[listKey].map((proxy) => proxy.id));
        }

        console.log({ ids });

        for (const id of ids) {
          const proxyIndex = state.collection[listKey].findIndex(
            (proxy) => proxy.id === id
          );
          state.collection[listKey][proxyIndex].status = 'CHECKING';
        }
      }
    },
  },
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
      const { id, proxyListKey } = payload;

      if (state.collection[proxyListKey]) {
        state.collection[proxyListKey].push(payload);
      } else {
        state.collection[proxyListKey] = [payload];
      }

      checkProxyStatus([
        {
          listKey: proxyListKey,
          ids: [id],
        },
      ]).then((recheckProxy: CheckProxyResponse[]) => {
        const res = recheckProxy.at(0);
        const { status, id } = res.responseStatusList.at(0);

        mainStore.dispatch(
          editProxy({ proxyListKey: res.listKey, id, status })
        );
      });
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
    [recheckProxy.fulfilled as any]: (state, action) => {
      const checkResponse = action.payload as CheckProxyResponse[];

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
    },
  },
});

export const getProxies = (state: RootState) => state.proxies.collection;

export const { updateToChecking, updateToBulkChecking } = store.actions;

export const getProxyStatus = (state: RootState) => state.proxies.status;

export default store.reducer;
