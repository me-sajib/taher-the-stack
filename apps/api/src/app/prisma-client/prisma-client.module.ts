import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaClientService } from './prisma-client.service';

@Module({
  imports: [ConfigModule],
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class PrismaClientModule {}
