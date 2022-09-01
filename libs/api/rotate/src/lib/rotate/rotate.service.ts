import ApiPrismaService from '@api/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RotateService {
  constructor(private prisma: ApiPrismaService) {}

  async rotateProxy(username: string) {
    const proxyList = await this.prisma.proxyList.findUnique({
      where: {
        username,
      },
      include: {
        Proxies: true,
      },
    });

    const { rotatingId, Proxies } = proxyList;

    if (!Proxies.length) {
      return {};
    }

    console.log(Proxies);

    console.log(rotatingId);
    if (Proxies.length > rotatingId) {
      await this.prisma.proxyList.update({
        where: {
          username,
        },
        data: {
          rotatingId: rotatingId + 1,
        },
      });

      return Proxies[rotatingId];
    }

    const proxy = Proxies[0];
    await this.prisma.proxyList.update({
      where: {
        username,
      },
      data: {
        rotatingId: 1,
      },
    });

    return proxy;
  }
}
