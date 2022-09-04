import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BasicStrategyModule } from './basic-strategy/basic-strategy.module';
import { CheckProxyModule } from './check-proxy/check-proxy.module';
import { ProxyListModule } from './proxy-list/proxy-list.module';
import { ProxyModule } from './proxy/proxy.module';
import { UserModule } from './user/user.module';
import { PrismaClientModule } from './prisma-client/prisma-client.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProxyListModule,
    ProxyModule,
    CheckProxyModule,
    BasicStrategyModule,
    PrismaClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
