import { Injectable } from '@nestjs/common';
import { Proxy } from '@prisma/client';
import axios from 'axios';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { ParamDto } from './dto';

@Injectable()
export class CheckProxyService {
  constructor(private prisma: PrismaClientService) {}

  async checkProxy({ username, password }, params: ParamDto) {
    const proxy = await this.prisma.proxy.findUnique({
      where: {
        id: +params.proxyId,
      },
    });

    return this.getProxyStatus(proxy, {
      username,
      password,
    });
  }

  async getProxyStatus(
    proxy: Proxy,
    auth: { username: string; password: string }
  ) {
    const { host, port } = proxy;
    const { data } = await axios.get('https://www.httpbin.org/ip', {
      proxy: {
        host,
        port,
        auth,
      },
    });

    const status = data?.origin === proxy.host ? 'ACTIVE' : 'INACTIVE';

    return { status };
  }
}
