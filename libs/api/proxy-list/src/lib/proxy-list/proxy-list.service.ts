import ApiPrismaService from '@api/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { ProxyList } from '@prisma/client';
import { ProxyListDto } from '../dto';

@Injectable()
export class ProxyListService {
  constructor(private prisma: ApiPrismaService) {}

  async createProxyList(list: ProxyListDto) {
    const proxyList = await this.prisma.proxyList.create({
      data: list,
    });

    Logger.log(`Proxy list created successfully. ${JSON.stringify(proxyList)}`);
    return proxyList;
  }

  async getBulkProxyLists(listKeys?: string[]) {
    const option = {
      where: {
        key: {
          in: listKeys,
        },
      },
    };

    const proxyLists = await this.prisma.proxyList.findMany(
      listKeys ? option : null
    );

    listKeys
      ? Logger.log(`GET: all of proxyList keys: ${JSON.stringify(proxyLists)}`)
      : Logger.log(`GET: all proxyList`);

    return proxyLists;
  }

  async deleteBulkProxyList(listKeys?: string[]) {
    const option = {
      where: {
        key: {
          in: listKeys,
        },
      },
    };

    await this.prisma.proxyList.deleteMany(listKeys ? option : null);

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

  async updateProxyList(listKey: string, updatedProxyList: ProxyList) {
    delete updatedProxyList.key;

    const updatedList = await this.prisma.proxyList.update({
      where: {
        key: listKey,
      },
      data: updatedProxyList,
    });

    delete updatedList.password;

    return updatedList;
  }
}
