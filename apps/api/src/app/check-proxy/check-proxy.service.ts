import { Injectable } from '@nestjs/common';
import { Proxy } from '@prisma/client';
import axios from 'axios';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { ParamDto } from './dto';

@Injectable()
export class CheckProxyService {
  constructor(private prisma: PrismaClientService) {}

  async checkProxy(params: ParamDto, listKey: string) {
    const proxy = await this.prisma.proxy.findFirst({
      where: {
        id: +params.proxyId,
        proxyListKey: listKey,
      },
    });

    return this.getProxyStatus(proxy, {
      username: proxy.username,
      password: proxy.password,
    });
  }

  async getProxyStatus(
    proxy: Proxy,
    auth: { username: string; password: string }
  ) {
    const { host, port } = proxy;
    try {
      const { data } = await axios.get('https://www.httpbin.org/ip', {
        proxy: {
          host,
          port,
          auth,
        },
      });
      return { status: data?.origin === proxy.host ? 'ACTIVE' : 'INACTIVE' };
    } catch (e) {
      return { status: 'INACTIVE' };
    }
  }
}
