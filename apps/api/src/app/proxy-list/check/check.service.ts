import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CheckProxyService } from '../../check-proxy/check-proxy.service';
import { PrismaClientService } from '../../prisma-client/prisma-client.service';
import { BodyDto } from './dto';

@Injectable()
export class CheckService {
    constructor(private prisma: PrismaClientService, private checkProxyService: CheckProxyService) {}

    async checkProxy({ checkProxyListIds }: BodyDto) {
        const ids: number[] = []

        for (const proxyListId of checkProxyListIds) {
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
            })

            for (const { id } of proxyIds.Proxies) {
                ids.push(id)
            }
        }

        await this.prisma.proxy.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                status: "CHECKING"
            }
        })

        for (const id of ids) {
            await this.checkProxyService.getProxyStatus(
                await this.checkProxyService.getProxy(id)
            )
        }

        return new HttpException('Checked all proxy list', HttpStatus.OK)
    }
}
