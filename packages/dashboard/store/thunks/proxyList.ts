import { ProxyList } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProxyListModalData } from 'interfaces';
import qs from 'qs';
import { isAuthorize } from 'utils';

const PROXY_LIST_URL =
  '/api/proxy-list';

export const fetchProxyList =
  createAsyncThunk(
    'proxyList/fetchProxyList',
    async () => {
      try {
        const { data } =
          await axios.get(
            `${PROXY_LIST_URL}?includeProxies=true`
          );

        return data.map(
          ({ Proxies, ...rest }) => ({
            ...rest,
            totalProxy: Proxies.length
          })
        );
      } catch (e) {
        isAuthorize(e.response);
      }
    }
  );

export const createProxyList =
  createAsyncThunk(
    'proxyList/createProxyList',
    async (
      payload: ProxyListModalData
    ) => {
      try {
        const { data } =
          await axios.post(
            `${PROXY_LIST_URL}/new`,
            payload
          );

        if (
          data.status &&
          data.status !== 200
        ) {
          return {
            error: {
              status: data.status,
              message: data.message
            }
          };
        }
        return { data };
      } catch (e) {
        isAuthorize(e.response);
      }
    }
  );

export const deleteProxyList =
  createAsyncThunk(
    'proxyList/deleteProxyList',
    async (payload: {
      listKeys: string[];
    }) => {
      try {
        await axios.delete(
          `${PROXY_LIST_URL}/delete?${qs.stringify(
            payload,
            { encode: false }
          )}`
        );

        return payload;
      } catch (e) {
        isAuthorize(e.response);
      }
    }
  );

export const editProxyList =
  createAsyncThunk(
    'proxyList/editProxyList',
    async (payload: ProxyList[]) => {
      try {
        const { data } =
          await axios.patch(
            `${PROXY_LIST_URL}/update`,
            payload
          );

        if (
          data.status &&
          data.status !== 200
        ) {
          return {
            error: {
              status: data.status,
              message: data.message
            }
          };
        }
        return { data };
      } catch (e) {
        isAuthorize(e.response);
      }
    }
  );

export const recheckProxyList =
  createAsyncThunk(
    'proxyList/recheckProxyList',
    async (payload: {
      checkProxyListIds: string[];
    }) => {
      try {
        const { data } =
          await axios.patch(
            `${PROXY_LIST_URL}/check`,
            payload
          );
        return data;
      } catch (e) {
        isAuthorize(e.response);
      }
    }
  );
