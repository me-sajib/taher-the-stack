import { Module } from '@nestjs/common';
import { ProxyService } from './proxy/proxy.service';
import { ProxyController } from './proxy/proxy.controller';

@Module({
  controllers: [ProxyController],
  providers: [ProxyService],
  exports: [],
})
export class ApiProxyModule {}
