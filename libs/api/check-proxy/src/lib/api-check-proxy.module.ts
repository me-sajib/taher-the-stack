import { ApiSharedBasicStrategyModule } from '@api-shared/basic-strategy';
import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { CheckProxyController } from './check-proxy/check-proxy.controller';
import { CheckProxyService } from './check-proxy/check-proxy.service';

@Module({
  imports: [ApiPrismaModule, ApiSharedBasicStrategyModule],
  controllers: [CheckProxyController],
  providers: [CheckProxyService],
  exports: [],
})
export class ApiCheckProxyModule {}
