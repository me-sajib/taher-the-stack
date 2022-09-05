import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { BasicStrategyModule } from '../basic-strategy/basic-strategy.module';
import { CheckProxyController } from './check-proxy.controller';
import { CheckProxyService } from './check-proxy.service';

@Module({
  imports: [ApiPrismaModule, BasicStrategyModule],
  controllers: [CheckProxyController],
  providers: [CheckProxyService],
  exports: [],
})
export class CheckProxyModule {}
