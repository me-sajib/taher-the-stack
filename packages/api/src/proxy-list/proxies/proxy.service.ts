import {
  Injectable,
  Logger
} from '@nestjs/common';
import { CheckProxyService } from '../../check-proxy/check-proxy.service';
import { PrismaClientService } from '../../prisma-client/prisma-client.service';
import {
  CheckBodyDto,
  ProxyCreateDto,
  ProxyUpdateDto
} from './dto';

@Injectable()
export class ProxyService {
  constructor(
    private prisma: PrismaClientService,
    private checkProxyService: CheckProxyService
  ) {}

  async createProxy(
    userId: string,
    dto: ProxyCreateDto
  ) {
    const proxy =
      await this.prisma.proxy.create({
        data: {
          ...dto,
          userId
        }
      });

    Logger.log(
      `Proxy created successfully.:\n${JSON.stringify(
        proxy
      )}`
    );
    return proxy;
  }

  async getBulkProxies(
    userId: string,
    proxyListKey: string
  ) {
    const proxies =
      await this.prisma.proxy.findMany({
        where: Object.assign(
          { userId },
          proxyListKey && {
            proxyListKey
          }
        )
      });

    return proxies;
  }

  async deleteBulkProxies(
    userId: string,
    proxyListKey: string,
    proxyIds?: string[]
  ) {
    await this.prisma.proxy.deleteMany({
      where: Object.assign(
        {
          userId,
          proxyListKey
        },
        proxyIds && {
          id: {
            in: proxyIds
              .map(Number)
              .filter((number) =>
                Number.isInteger(number)
              )
          }
        }
      )
    });

    proxyIds
      ? Logger.log(
          `DELETE: bulk deletes proxy list:\n${JSON.stringify(
            proxyIds
          )}`
        )
      : Logger.log(
          `DELETE: all proxy lists`
        );

    return {
      status: 200,
      message:
        'Deleted proxy successfully'
    };
  }

  async updateBulkProxy(
    updatedProxies: ProxyUpdateDto[]
  ) {
    return Promise.all(
      updatedProxies.map(
        async (updatedProxy) => {
          const {
            id,
            ...restUpdatedProxy
          } = updatedProxy;

          const updated =
            await this.prisma.proxy.update(
              {
                where: {
                  id
                },
                data: {
                  ...restUpdatedProxy
                }
              }
            );

          return updated;
        }
      )
    );
  }

  async checkProxies(
    {
      checkProxyIds = []
    }: CheckBodyDto,
    userId: string
  ) {
    // if user don't provide any proxy id
    if (checkProxyIds.length === 0) {
      const proxies =
        await this.prisma.proxy.findMany(
          {
            where: {
              userId
            }
          }
        );

      checkProxyIds = proxies.map(
        (proxy) => proxy.id
      );
    }

    await this.prisma.proxy.updateMany({
      where: Object.assign(
        { userId },
        checkProxyIds && {
          id: {
            in: checkProxyIds
          }
        }
      ),
      data: {
        status: 'CHECKING'
      }
    });

    return Promise.all(
      checkProxyIds.map(
        async (id) =>
          await this.checkProxyService.getProxyStatus(
            await this.checkProxyService.getProxy(
              id
            )
          )
      )
    );
  }
}
