import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProxyList } from '@prisma/client';
import { isUniqueError } from 'utils';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { ProxyListBodyDto, ProxyListParamDto, ProxyListUpdateDto } from './dto';

@Injectable()
export class ProxyListService {
  constructor(private prisma: PrismaClientService) {}

  async createProxyList(list: ProxyListBodyDto, userId: string) {
    try {
      const proxyList = await this.prisma.proxyList.create({
        data: {
          ...list,
          userId,
        },
      });

      Logger.log(
        `Proxy list created successfully.\n${JSON.stringify(
          proxyList,
          null,
          2
        )}`
      );
      return proxyList;
    } catch (e) {
      const uniqueError = isUniqueError(e);

      if (uniqueError) {
        return uniqueError;
      }
    }
  }

  async getProxyList(param: ProxyListParamDto) {
    const uniqueProxyList: ProxyList = await this.prisma.proxyList.findUnique({
      where: {
        username: param.username,
      },
      include: {
        Proxies: true,
      },
    });

    return uniqueProxyList;
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

    return new HttpException('Deleted proxy list successfully', HttpStatus.OK);
  }

  async bulkUpdateProxyList(updatedProxyList: ProxyListUpdateDto[]) {
    const updatedList = [];

    for (const proxyList of updatedProxyList) {
      const { key, ...restUpdatedProxyList } = proxyList;

      try {
        updatedList.push(
          await this.prisma.proxyList.update({
            where: {
              key,
            },
            data: restUpdatedProxyList,
          })
        );
      } catch (e) {
        const uniqueError = isUniqueError(e);

        if (uniqueError) {
          return uniqueError;
        }
      }
    }

    return updatedList;
  }
}
