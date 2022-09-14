import { Injectable, Logger } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { ProxyListDto, ProxyListUpdateDto } from './dto';

@Injectable()
export class ProxyListService {
  constructor(private prisma: PrismaClientService) {}

  async createProxyList(list: ProxyListDto) {
    const proxyList = await this.prisma.proxyList.create({
      data: list,
    });

    Logger.log(
      `Proxy list created successfully.\n${JSON.stringify(proxyList, null, 2)}`
    );
    return proxyList;
  }

  async getBulkProxyLists(
    userId: string,
    listKeys?: string[],
    includeProxies?: boolean
  ) {
    const proxyLists = await this.prisma.proxyList.findMany({
      where: Object.assign(
        { userId },
        listKeys && {
          key: {
            in: listKeys,
          },
        }
      ),
      include: {
        Proxies: includeProxies ?? false,
      },
    });

    listKeys
      ? Logger.log(
          `GET: all of proxyList keys:\n${JSON.stringify(proxyLists, null, 2)}`
        )
      : Logger.log(`GET: all proxyList`);

    return proxyLists;
  }

  async deleteBulkProxyList(userId: string, listKeys?: string[]) {
    await this.prisma.proxyList.deleteMany({
      where: Object.assign(
        { userId },
        listKeys && {
          key: {
            in: listKeys,
          },
        }
      ),
    });

    listKeys
      ? Logger.log(
          `DELETE: bulk deletes proxy list: ${JSON.stringify(listKeys)}`
        )
      : Logger.log(`DELETE: all proxy lists`);

    return {
      status: 200,
      message: 'Deleted proxy list successfully',
    };
  }

  async updateProxyList(updatedProxyList: ProxyListUpdateDto[]) {
    const updatedList = [];

    for (const proxyList of updatedProxyList) {
      const { key, ...restUpdatedProxyList } = proxyList;

      updatedList.push(
        await this.prisma.proxyList.update({
          where: {
            key,
          },
          data: restUpdatedProxyList,
        })
      );
    }

    return updatedList;
  }
}
