import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';

@Module({
  imports: [PrismaClientModule, JwtModule.register({}), ConfigModule],
  controllers: [ProxyController],
  providers: [ProxyService, JwtStrategy],
})
export class ProxyModule {}
