import { Proxy, ProxyList } from '@prisma/client';

export interface RotateProxy {
  host: string;
  port: number;
  auth: string;
}

export interface Options {
  port: number;
  hostname: string;
  method: string;
  path: string;
  headers: unknown;
}

export interface Auth {
  username: string;
  password: string;
}

export type ProxyListWithProxy = ProxyList & {
  Proxies: Proxy[];
};

export type ServerEvent = 'request' | 'connect';

export interface ResponseError extends Error {
  statusCode?: number;
}
