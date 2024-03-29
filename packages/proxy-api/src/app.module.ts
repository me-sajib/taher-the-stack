import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProxyModule } from './proxies/proxy.module';
import { ProxyListModule } from './proxy-list/proxy-list.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    ProxyListModule,
    ProxyModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
