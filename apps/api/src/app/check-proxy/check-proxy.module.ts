import { Module } from '@nestjs/common';
import { BasicStrategyModule } from '../basic-strategy/basic-strategy.module';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { CheckProxyController } from './check-proxy.controller';
import { CheckProxyService } from './check-proxy.service';

@Module({
  imports: [PrismaClientModule, BasicStrategyModule],
  controllers: [CheckProxyController],
  providers: [CheckProxyService],
  exports: [],
})
export class CheckProxyModule {}
