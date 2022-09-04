import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { BasicStrategy } from './auth.strategy';

@Module({
  imports: [PassportModule, ConfigModule, PrismaClientModule],
  providers: [BasicStrategy],
})
export class BasicStrategyModule {}
