import { Module } from '@nestjs/common';
import { ApiPrismaService } from './api-prisma.service';

@Module({
  providers: [ApiPrismaService],
  exports: [ApiPrismaService],
})
export class ApiPrismaModule {}
