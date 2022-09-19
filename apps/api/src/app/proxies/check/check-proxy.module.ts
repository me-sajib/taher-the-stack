import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../../prisma-client/prisma-client.module';
import { CheckProxyController } from './check-proxy.controller';
import { CheckProxyService } from './check-proxy.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [CheckProxyController],
  providers: [CheckProxyService],
  exports: [],
})
export class CheckProxyModule {}
