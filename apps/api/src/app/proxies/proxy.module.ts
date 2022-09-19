import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { CheckProxyModule } from './check/check-proxy.module';

@Module({
  imports: [JwtModule.register({}), ConfigModule, PrismaClientModule, CheckProxyModule],
  controllers: [ProxyController],
  providers: [ProxyService, JwtStrategy],
})
export class ProxyModule {}
