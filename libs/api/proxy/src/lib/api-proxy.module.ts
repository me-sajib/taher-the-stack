import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { ProxyController } from './proxy/proxy.controller';
import { ProxyService } from './proxy/proxy.service';

@Module({
  imports: [ApiPrismaModule],
  controllers: [ProxyController],
  providers: [ProxyService],
  exports: [],
})
export class ApiProxyModule {}
