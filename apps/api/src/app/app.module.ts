import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProxyListModule } from './proxy-list/proxy-list.module';
import { UserModule } from './user/user.module';
import { ProxyModule } from './proxy/proxy.module';
import { CheckProxyModule } from './check-proxy/check-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProxyListModule,
    ProxyModule,
    CheckProxyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
