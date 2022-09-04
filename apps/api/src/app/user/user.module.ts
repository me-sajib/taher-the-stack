import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ApiPrismaModule, JwtModule.register({}), ConfigModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
