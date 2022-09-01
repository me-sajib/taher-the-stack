import { ApiSharedBasicStrategyModule } from '@api-shared/basic-strategy';
import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { RotateController } from './rotate/rotate.controller';
import { RotateService } from './rotate/rotate.service';

@Module({
  imports: [ApiSharedBasicStrategyModule, ApiPrismaModule],
  controllers: [RotateController],
  providers: [RotateService],
  exports: [],
})
export class ApiRotateModule {}
