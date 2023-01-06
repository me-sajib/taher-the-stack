import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { CheckProxyModule } from '../check-proxy/check-proxy.module';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { ProxyListController } from './proxy-list.controller';
import { ProxyListService } from './proxy-list.service';

@Module({
  imports: [
    PrismaClientModule,
    JwtModule.register({}),
    ConfigModule,
    CheckProxyModule
  ],
  controllers: [ProxyListController],
  providers: [ProxyListService, JwtStrategy]
})
export class ProxyListModule {}
