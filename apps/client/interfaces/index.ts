import { ProxyStatus } from '@prisma/client';

export interface ProxyListModalData {
  name: string;
  username: string;
  password: string;
  userId: string;
}

export interface ProxyModalData {
  host: string;
  port: number;
  country?: string;
  status?: string;
  proxyListKey: string;
  totalHits?: number;
}

export interface CheckProxyResponse {
  id: number;
  lastCheckAt: Date;
  status: ProxyStatus;
}

