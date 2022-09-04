import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { CheckProxyController } from './check-proxy/check-proxy.controller';
import { CheckProxyService } from './check-proxy/check-proxy.service';
import { AuthModule } from './strategy/auth-strategy.module';

@Module({
  imports: [ApiPrismaModule, AuthModule],
  controllers: [CheckProxyController],
  providers: [CheckProxyService],
  exports: [],
})
export class ApiCheckProxyModule {}
