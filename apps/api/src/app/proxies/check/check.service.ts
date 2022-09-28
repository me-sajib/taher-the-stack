import { Injectable } from '@nestjs/common';
import { CheckProxyService } from '../../check-proxy/check-proxy.service';
import { PrismaClientService } from '../../prisma-client/prisma-client.service';
import { BodyDto } from './dto';

@Injectable()
export class CheckService {
  constructor(
    private prisma: PrismaClientService,
    private checkProxyService: CheckProxyService
  ) {}

  async checkProxies({ checkProxyIds }: BodyDto) {
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
