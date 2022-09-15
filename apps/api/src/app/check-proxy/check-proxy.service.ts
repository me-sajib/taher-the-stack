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
      const { listKey, ids = [] } = list;

      const responseStatusList = [];

      if (ids.length === 0) {
        ids.push(
          ...(
            await this.prisma.proxy.findMany({
              where: {
                proxyListKey: listKey,
              },
              select: {
                id: true,
              },
            })
          ).map(({ id }) => id)
        );
      }

      await this.prisma.proxy.updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: {
          status: 'CHECKING',
        },
      });

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

  async setStatus(status: ProxyStatus, id: number) {
    const data = Object.assign(
      { status },
      status !== 'CHECKING' && { lastCheckAt: new Date() }
    );

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
