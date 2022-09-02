import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { ProxyListController } from './proxy-list/proxy-list.controller';
import { ProxyListService } from './proxy-list/proxy-list.service';

@Module({
  imports: [ApiPrismaModule],
  controllers: [ProxyListController],
  providers: [ProxyListService],
  exports: [],
})
export class ApiProxyListModule {}
