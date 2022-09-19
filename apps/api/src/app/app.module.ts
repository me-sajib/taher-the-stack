import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProxyListModule } from './proxy-list/proxy-list.module';
import { ProxyModule } from './proxy-list/proxies/proxy.module';
import { UserModule } from './user/user.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProxyListModule,
    ProxyModule,
    PrismaClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
