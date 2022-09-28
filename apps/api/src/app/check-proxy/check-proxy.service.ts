import { Injectable } from '@nestjs/common';
import { Proxy, ProxyStatus } from '@prisma/client';
import axios from 'axios';
import { PrismaClientService } from '../prisma-client/prisma-client.service';

@Injectable()
export class CheckProxyService {
  constructor(private prisma: PrismaClientService) {}

  async getProxy(id: number) {
    try {
      const proxy = await this.prisma.proxy.findUnique({
        where: {
          id,
        },
      });

      return proxy;
    } catch (e) {
      return null;
    }
  }

  async setStatus(status: ProxyStatus, id: number) {
    const data = { status, lastCheckAt: new Date() };

    await this.prisma.proxy.update({
      where: {
        id,
      },
      data,
    });

    return {
      id,
      ...data,
    };
  }

  async getProxyStatus(proxy: Proxy) {
    const { id, host, port, username, password } = proxy;

    try {
      await axios.get('https://www.httpbin.org/ip', {
        proxy: {
          host,
          port,
          auth: {
            username,
            password,
          },
        },
      });

      return this.setStatus('ACTIVE', id);
    } catch (e) {
      return this.setStatus('INACTIVE', id);
    }
  }
}
