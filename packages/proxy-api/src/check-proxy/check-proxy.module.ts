import { Module } from '@nestjs/common';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { CheckProxyService } from './check-proxy.service';

@Module({
  imports: [PrismaClientModule],
  providers: [CheckProxyService],
  exports: [CheckProxyService]
})
export class CheckProxyModule {}
