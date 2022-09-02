import ApiPrismaService from '@api/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { ProxyDto, ProxyUpdateDto } from '../dto';

@Injectable()
export class ProxyService {
  constructor(private prisma: ApiPrismaService) {}

  async createProxy(dto: ProxyDto) {
    const proxy = await this.prisma.proxy.create({
      data: dto,
    });

    Logger.log(`Proxy created successfully. ${JSON.stringify(proxy)}`);
    return proxy;
  }

  async getBulkProxies(proxyIds?: number[]) {
    const option = {
      where: {
        id: {
          in: proxyIds,
        },
      },
    };

    const proxies = await this.prisma.proxy.findMany(proxyIds ? option : null);

    proxyIds
      ? Logger.log(`GET: all of proxies: ${JSON.stringify(proxies)}`)
      : Logger.log(`GET: all proxies`);

    return proxies;
  }

  async deleteBulkProxies(proxyIds?: number[]) {
    const option = {
      where: {
        id: {
          in: proxyIds,
        },
      },
    };

    await this.prisma.proxy.deleteMany(proxyIds ? option : null);

    proxyIds
      ? Logger.log(
          `DELETE: bulk deletes proxy list: ${JSON.stringify(proxyIds)}`
        )
      : Logger.log(`DELETE: all proxy lists`);

    return {
      status: 200,
      message: 'Deleted proxy successfully',
    };
  }

  async updateProxy(updatedProxy: ProxyUpdateDto) {
    const { id, ...restUpdatedProxy } = updatedProxy;

    const updated = await this.prisma.proxy.update({
      where: {
        id,
      },
      data: restUpdatedProxy,
    });

    return updated;
  }
}
