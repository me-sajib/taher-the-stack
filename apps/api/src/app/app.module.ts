import { ApiAuthModule } from '@api/auth';
import { ApiRotateModule } from '@api/rotate';
import { ApiUsernameModule } from '@api/username';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ApiRotateModule,
    ApiAuthModule,
    ApiUsernameModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
