import { Injectable, Logger } from '@nestjs/common';
import { CheckProxyService } from '../check-proxy/check-proxy.service';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { CheckBodyDto, ProxyCreateDto, ProxyUpdateDto } from './dto';

@Injectable()
export class ProxyService {
  constructor(
    private prisma: PrismaClientService,
    private checkProxyService: CheckProxyService
  ) {}

  async createProxy(userId: string, dto: ProxyCreateDto) {
    const proxy = await this.prisma.proxy.create({
      data: {
        ...dto,
        userId,
      },
    });

    Logger.log(`Proxy created successfully.:\n${JSON.stringify(proxy)}`);
    return proxy;
  }

  async getBulkProxies(
    userId: string,
    proxyListKey: string,
    proxyIds?: number[]
  ) {
    const proxies = await this.prisma.proxy.findMany({
      where: Object.assign(
        {
          proxyListKey,
          userId,
        },
        proxyIds && {
          id: {
            in: proxyIds,
          },
        }
      ),
    });

    proxyIds
      ? Logger.log(`GET: all of proxies:\n${JSON.stringify(proxies)}`)
      : Logger.log(`GET: all proxies`);

    return proxies;
  }

  async deleteBulkProxies(
    userId: string,
    proxyListKey: string,
    proxyIds?: number[]
  ) {
    await this.prisma.proxy.deleteMany({
      where: Object.assign(
        {
          userId,
          proxyListKey,
        },
        proxyIds && {
          id: {
            in: proxyIds,
          },
        }
      ),
    });

    proxyIds
      ? Logger.log(
          `DELETE: bulk deletes proxy list:\n${JSON.stringify(proxyIds)}`
        )
      : Logger.log(`DELETE: all proxy lists`);

    return {
      status: 200,
      message: 'Deleted proxy successfully',
    };
  }

  async updateBulkProxy(updatedProxies: ProxyUpdateDto[]) {
    return Promise.all(
      updatedProxies.map(async (updatedProxy) => {
        const { id, ...restUpdatedProxy } = updatedProxy;

        const updated = await this.prisma.proxy.update({
          where: {
            id,
          },
          data: {
            ...restUpdatedProxy,
          },
        });

        return updated;
      })
    );
  }

  async checkProxies({ checkProxyIds }: CheckBodyDto) {
    await this.prisma.proxy.updateMany({
      where: {
        id: {
          in: checkProxyIds,
        },
      },
      data: {
        status: 'CHECKING',
      },
    });

    return Promise.all(
      checkProxyIds.map(
        async (id) =>
          await this.checkProxyService.getProxyStatus(
            await this.checkProxyService.getProxy(id)
          )
      )
    );
  }
}
