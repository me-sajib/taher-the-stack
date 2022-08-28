import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { AuthController } from './api-auth.controller';
import { AuthService } from './api-auth.service';

@Module({
  imports: [ApiPrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class ApiAuthModule {}
