import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { CheckModule } from './check/check.module';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule,
    PrismaClientModule,
    CheckModule,
  ],
  controllers: [ProxyController],
  providers: [ProxyService, JwtStrategy],
})
export class ProxyModule {}
