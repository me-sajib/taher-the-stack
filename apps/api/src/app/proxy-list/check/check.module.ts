import { Module } from '@nestjs/common';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { CheckProxyModule } from '../../check-proxy/check-proxy.module';
import { PrismaClientModule } from '../../prisma-client/prisma-client.module';

@Module({
  imports: [CheckProxyModule, PrismaClientModule],
  providers: [CheckService],
  controllers: [CheckController],
})
export class CheckModule {}
