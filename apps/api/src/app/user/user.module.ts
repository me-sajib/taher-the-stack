import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy';
import { PrismaClientModule } from '../prisma-client/prisma-client.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaClientModule, JwtModule.register({}), ConfigModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
