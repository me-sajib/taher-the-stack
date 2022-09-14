import { ProxyList } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProxyListModalData } from 'interfaces';

const PROXY_LIST_URL = `/api/proxy-list`;

export const fetchProxyList = createAsyncThunk(
  'proxyList/fetchProxyList',
  async () => {
    const token = localStorage.getItem('proxy-manager-token');
    const { data } = await axios.get(PROXY_LIST_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);

export const createProxyList = createAsyncThunk(
  'proxyList/createProxyList',
  async (payload: ProxyListModalData) => {
    const token = localStorage.getItem('proxy-manager-token');

    const { data } = await axios.post(PROXY_LIST_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);

export const deleteProxyList = createAsyncThunk(
  'proxyList/deleteProxyList',
  async (payload: { listKeys: string[] }) => {
    const token = localStorage.getItem('proxy-manager-token');

    await axios.delete(PROXY_LIST_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });

    return payload;
  }
);

export const editProxyList = createAsyncThunk(
  'proxyList/editProxyList',
  async (payload: ProxyList[]) => {
    const token = localStorage.getItem('proxy-manager-token');

    const { data } = await axios.patch(PROXY_LIST_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
);
