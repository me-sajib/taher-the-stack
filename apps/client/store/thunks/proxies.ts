import { Proxy } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CheckProxyPayload, ProxyModalData } from 'interfaces';
import store from 'store';
const PROXY_URL = '/api/proxies';

export const fetchProxies = createAsyncThunk(
  'proxies/fetchProxies',
  async (payload: { proxyListKey?: string }) => {
    const token = localStorage.getItem('proxy-manager-token');
    const queryParams = new URLSearchParams(payload).toString();

    try {
      const { data } = await axios.get(
        `${PROXY_URL}${queryParams.padStart(
          queryParams.length && queryParams.length + 1,
          '?'
        )}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (e) {
      return [];
    }
  }
);

export const createProxy = createAsyncThunk(
  'proxies/createProxy',
  async (payload: ProxyModalData) => {
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
  }
);

export const deleteProxy = createAsyncThunk(
  'proxies/deleteProxy',
  async (payload: { proxyListKey: string; proxyIds: number[] }) => {
    await axios.delete(`${PROXY_URL}/delete`, {
      data: payload,
    });

    return payload;
  }
);

export const editProxy = createAsyncThunk(
  'proxies/editProxy',
  async (payload: Proxy[]) => {
    payload = payload.map((proxy) => {
      proxy.port &&= Number(proxy.port);

      return proxy;
    });

    const { data } = await axios.patch(`${PROXY_URL}/update`, payload);

    return data;
  }
);

export const recheckProxy = createAsyncThunk(
  'proxies/recheckProxy',
  async (checkList: CheckProxyPayload[]) => {
    console.log('Recheck proxy called');
    const { data } = await axios.post(`${PROXY_URL}/check`, { checkList });

    return data;
  }
);