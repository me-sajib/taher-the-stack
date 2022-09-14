import { Proxy } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CheckProxyPayload, ProxyModalData } from 'interfaces';

const PROXY_URL = `/api/proxies`;

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
  async (payload: Proxy) => {
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
  async (checkList: CheckProxyPayload[]) => {
    const token = localStorage.getItem('proxy-manager-token');

    console.log('Recheck proxy called');
    const { data } = await axios.post(
      `/api/check-proxy`,
      { checkList },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log({ data });

    return data;
  }
);
