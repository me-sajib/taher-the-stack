import ApiPrismaService from '@api/prisma';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ProxyList } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class ProxyListService {
  constructor(private prisma: ApiPrismaService) {}

  async createProxyList(list: ProxyList) {
    const proxyList = await this.prisma.proxyList.create({
      data: list,
    });

    Logger.log(`Proxy list created successfully. ${JSON.stringify(proxyList)}`);
    return proxyList;
  }

  async getUniqueProxyList(listKey: string) {
    const proxyList = await this.prisma.proxyList.findUnique({
      where: {
        key: listKey,
      },
    });

    if (proxyList) {
      Logger.log(`GET: username: ${proxyList.username} list`);
      return proxyList;
    }

    throw new BadRequestException('Proxy list not found');
  }

  async bulkGetProxyLists(listKeys?: string[]) {
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

  async deleteUniqueProxyList(listKey: string) {
    const deletedProxyList = await this.prisma.proxyList.delete({
      where: {
        key: listKey,
      },
    });

    Logger.log(
      `DELETE: deleted proxy list: ${JSON.stringify(deletedProxyList)}`
    );
    return deletedProxyList;
  }

  async bulkDeleteProxyList(listKeys?: string[]) {
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
    return listKeys;
  }

  async updateProxyList(listKey: string, updatedProxyList: ProxyList) {
    delete updatedProxyList.key;

    if ('password' in updatedProxyList) {
      updatedProxyList.password = await argon.hash(updatedProxyList.password);
    }

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
