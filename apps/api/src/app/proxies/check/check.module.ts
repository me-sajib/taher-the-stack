import { Module } from '@nestjs/common';
import { CheckProxyModule } from '../../check-proxy/check-proxy.module';
import { PrismaClientModule } from '../../prisma-client/prisma-client.module';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';

@Module({
  imports: [PrismaClientModule, CheckProxyModule],
  controllers: [CheckController],
  providers: [CheckService],
  exports: [],
})
export class CheckModule {}
