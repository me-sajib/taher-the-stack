import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';

@Module({
  imports: [ApiPrismaModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [ApiAuthService],
})
export class ApiAuthModule {}
