import { Injectable } from '@nestjs/common';
import { Proxy, ProxyStatus } from '@prisma/client';
import axios from 'axios';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { BodyDto } from './dto';

@Injectable()
export class CheckProxyService {
  constructor(private prisma: PrismaClientService) {}

  async getProxy(id: number, proxyListKey: string) {
    try {
      const proxy = await this.prisma.proxy.findFirst({
        where: {
          id,
          proxyListKey,
        },
      });

      return proxy;
    } catch (e) {
      return null;
    }
  }

  async checkProxies({ checkList }: BodyDto) {
    const response = [];

    for (const list of checkList) {
      const { listKey, ids } = list;

      const responseStatusList = [];

      for (const id of ids) {
        responseStatusList.push(
          await this.getProxyStatus(await this.getProxy(id, listKey))
        );
      }

      response.push({
        listKey,
        responseStatusList,
      });
    }

    return response;
  }

  async getProxyStatus(proxy: Proxy) {
    const { id, host, port, username, password } = proxy;

    try {
      const { data: res } = await axios.get('https://www.httpbin.org/ip', {
        proxy: {
          host,
          port,
          auth: {
            username,
            password,
          },
        },
      });

      const data = {
        status: (res?.origin === proxy.host
          ? 'ACTIVE'
          : 'INACTIVE') as ProxyStatus,
        lastCheckAt: new Date(),
      };
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
    } catch (e) {
      return {
        id,
        status: 'INACTIVE',
        lastCheckAt: new Date(),
      };
    }
  }
}
