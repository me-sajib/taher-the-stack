import { Proxy } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CheckProxyPayload, ProxyModalData } from 'interfaces';
import store from 'store';
import { isAuthorize } from 'utils';

const PROXY_URL = '/api/proxies';

export const fetchProxies = createAsyncThunk(
  'proxies/fetchProxies',
  async (payload: { proxyListKey?: string }) => {
    const queryParams = new URLSearchParams(payload).toString();

    try {
      const { data } = await axios.get(
        `${PROXY_URL}${queryParams.padStart(
          queryParams.length && queryParams.length + 1,
          '?'
        )}`
      );

      return data;
    } catch (e) {
      isAuthorize(e.response);
      return [];
    }
  }
);

export const createProxy = createAsyncThunk(
  'proxies/createProxy',
  async (payload: ProxyModalData) => {
    try {
      payload.port = Number(payload.port);

      const { data: proxy } = await axios.post(`${PROXY_URL}/new`, payload);

      console.log('PROXY CREATED:', proxy);
      store.dispatch(
        recheckProxy([
          {
            listKey: proxy.proxyListKey,
            ids: [proxy.id],
          },
        ])
      );

      return proxy;
    } catch (e) {
      isAuthorize(e.response);
    }
  }
);

export const deleteProxy = createAsyncThunk(
  'proxies/deleteProxy',
  async (payload: { proxyListKey: string; proxyIds: number[] }) => {
    try {
      await axios.delete(`${PROXY_URL}/delete`, {
        data: payload,
      });

      return payload;
    } catch (e) {
      isAuthorize(e.response);
    }
  }
);

export const editProxy = createAsyncThunk(
  'proxies/editProxy',
  async (payload: Proxy[]) => {
    try {
      payload = payload.map((proxy) => {
        proxy.port &&= Number(proxy.port);

        return proxy;
      });

      const { data } = await axios.patch(`${PROXY_URL}/update`, payload);

      return data;
    } catch (e) {
      isAuthorize(e.response);
    }
  }
);

export const recheckProxy = createAsyncThunk(
  'proxies/recheckProxy',
  async (checkList: CheckProxyPayload[]) => {
    try {
      console.log('Recheck proxy called');
      const { data } = await axios.post(`${PROXY_URL}/check`, { checkList });

      return data;
    } catch (e) {
      isAuthorize(e.response);
    }
  }
);
