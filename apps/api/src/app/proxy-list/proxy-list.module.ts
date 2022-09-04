import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { ProxyListController } from './proxy-list.controller';
import { ProxyListService } from './proxy-list.service';

@Module({
  imports: [ApiPrismaModule, JwtModule.register({}), ConfigModule],
  controllers: [ProxyListController],
  providers: [ProxyListService, JwtStrategy],
})
export class ProxyListModule {}
