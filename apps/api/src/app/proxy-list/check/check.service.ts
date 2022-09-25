import { HttpStatus, Injectable } from '@nestjs/common';
import { CheckProxyService } from '../../check-proxy/check-proxy.service';
import { PrismaClientService } from '../../prisma-client/prisma-client.service';
import { BodyDto } from './dto';

@Injectable()
export class CheckService {
  constructor(
    private prisma: PrismaClientService,
    private checkProxyService: CheckProxyService
  ) {}

  async checkProxyList({ checkProxyListIds }: BodyDto) {
    // update all selected proxy list checking to true
    await this.prisma.proxyList.updateMany({
      where: {
        key: {
          in: checkProxyListIds,
        },
      },
      data: {
        checking: true,
      },
    });

    // this map holding key as proxy id and value is the key of that proxy
    const checkingMap: Map<number, string> = new Map();

    for (const proxyListId of checkProxyListIds) {
      // select all proxies of proxy list and store it in checkingMap
      const proxyIds = await this.prisma.proxyList.findUnique({
        where: {
          key: proxyListId,
        },
        select: {
          Proxies: {
            select: {
              id: true,
            },
          },
        },
      });

      for (const { id } of proxyIds.Proxies) {
        checkingMap.set(id, proxyListId);
      }
    }

    // update to status checking to each proxy
    await this.prisma.proxy.updateMany({
      where: {
        id: {
          in: [...checkingMap.keys()],
        },
      },
      data: {
        status: 'CHECKING',
      },
    });

    // this map store each proxy key & value is the number of that proxy list key
    const proxyKeyMap: { [proxyKey: string]: number } = {};

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
            key: proxyKey,
          },
          data: {
            checking: false,
          },
        });
      }

      checkingMap.delete(id);
    }

    return {
      status: HttpStatus.OK,
      checkProxyListIds,
      message: 'Checked all proxy list',
    };
  }
}
