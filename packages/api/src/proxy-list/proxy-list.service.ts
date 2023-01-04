import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger
} from '@nestjs/common';
import { ProxyList } from '@prisma/client';
import { isUniqueError } from '../lib';
import { CheckProxyService } from '../check-proxy/check-proxy.service';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import {
  CheckProxyListBody,
  ProxyListBodyDto,
  ProxyListGetDtoQuery,
  ProxyListParamDto,
  ProxyListUpdateDto
} from './dto';

@Injectable()
export class ProxyListService {
  constructor(
    private prisma: PrismaClientService,
    private checkProxyService: CheckProxyService
  ) {}

  async createProxyList(list: ProxyListBodyDto, userId: string) {
    try {
      const proxyList = await this.prisma.proxyList.create({
        data: {
          ...list,
          userId
        }
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

      return e;
    }
  }

  async getProxyList(param: ProxyListParamDto) {
    const uniqueProxyList: ProxyList =
      await this.prisma.proxyList.findUnique({
        where: {
          username: param.username
        },
        include: {
          Proxies: true
        }
      });

    return uniqueProxyList;
  }

  async getBulkProxyLists(
    userId: string,
    queryDto: ProxyListGetDtoQuery
  ) {
    const proxyLists = await this.prisma.proxyList.findMany({
      where: { userId },
      include: {
        Proxies: queryDto.includeProxies ?? false
      }
    });

    Logger.log(`GET: all proxyList`);

    return proxyLists;
  }

  async deleteBulkProxyList(userId: string, listKeys?: string[]) {
    await this.prisma.proxyList.deleteMany({
      where: Object.assign(
        { userId },
        listKeys && {
          key: {
            in: listKeys
          }
        }
      )
    });

    listKeys
      ? Logger.log(
          `DELETE: bulk deletes proxy list: ${JSON.stringify(
            listKeys
          )}`
        )
      : Logger.log(`DELETE: all proxy lists`);

    return new HttpException(
      'Deleted proxy list successfully',
      HttpStatus.OK
    );
  }

  async bulkUpdateProxyList(updatedProxyList: ProxyListUpdateDto[]) {
    const updatedList = [];

    for (const proxyList of updatedProxyList) {
      const { key, ...restUpdatedProxyList } = proxyList;

      try {
        updatedList.push(
          await this.prisma.proxyList.update({
            where: {
              key
            },
            data: restUpdatedProxyList
          })
        );
      } catch (e) {
        const uniqueError = isUniqueError(e);

        if (uniqueError) {
          return uniqueError;
        }

        return e;
      }
    }

    return updatedList;
  }

  async checkProxyList({ checkProxyListIds }: CheckProxyListBody) {
    // update all selected proxy list checking to true
    await this.prisma.proxyList.updateMany({
      where: {
        key: {
          in: checkProxyListIds
        }
      },
      data: {
        checking: true
      }
    });

    // this map holding key as proxy id and value is the key of that proxy
    const checkingMap: Map<number, string> = new Map();

    for (const proxyListId of checkProxyListIds) {
      // select all proxies of proxy list and store it in checkingMap
      const proxyIds = await this.prisma.proxyList.findUnique({
        where: {
          key: proxyListId
        },
        select: {
          Proxies: {
            select: {
              id: true
            }
          }
        }
      });

      for (const { id } of proxyIds.Proxies) {
        checkingMap.set(id, proxyListId);
      }
    }

    // update to status checking to each proxy
    await this.prisma.proxy.updateMany({
      where: {
        id: {
          in: [...checkingMap.keys()]
        }
      },
      data: {
        status: 'CHECKING'
      }
    });

    // this map store each proxy key & value is the number of that proxy list key
    const proxyKeyMap: {
      [proxyKey: string]: number;
    } = {};

    for (const proxyKey of checkingMap.values()) {
      if (proxyKey in proxyKeyMap) {
        proxyKeyMap[proxyKey]++;
      } else {
        proxyKeyMap[proxyKey] = 1;
      }
    }

    for (const id of checkingMap.keys()) {
      await this.checkProxyService.getProxyStatus(
        await this.checkProxyService.getProxy(id)
      );

      const proxyKey: string = checkingMap.get(id);

      proxyKeyMap[proxyKey]--;

      if (proxyKeyMap[proxyKey] === 0) {
        delete proxyKeyMap[proxyKey];

        await this.prisma.proxyList.update({
          where: {
            key: proxyKey
          },
          data: {
            checking: false
          }
        });
      }

      checkingMap.delete(id);
    }

    return {
      status: HttpStatus.OK,
      checkProxyListIds,
      message: 'Checked all proxy list'
    };
  }
}
