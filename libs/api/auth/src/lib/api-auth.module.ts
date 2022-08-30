import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './api-auth.controller';
import { ApiAuthService } from './api-auth.service';
import { JwtStrategy } from './strategy';

@Module({
  imports: [ApiPrismaModule, JwtModule.register({}), ConfigModule],
  controllers: [AuthController],
  providers: [ApiAuthService, JwtStrategy],
})
export class ApiAuthModule {}
