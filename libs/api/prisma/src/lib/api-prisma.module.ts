import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiPrismaService } from './api-prisma.service';

@Module({
  imports: [ConfigModule],
  providers: [ApiPrismaService],
  exports: [ApiPrismaService],
})
export class ApiPrismaModule {}
