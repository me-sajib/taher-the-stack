import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  ThrottlerGuard,
  ThrottlerModule
} from '@nestjs/throttler';
import { ParseController } from './parse.controller';
import { ParseService } from './parse.service';

@Module({
  imports: [
    ConfigModule,
    ThrottlerModule.forRoot({
      ttl: 60, // time to live
      limit: 15 // the maximum number of requests within the ttl
    })
  ],
  controllers: [ParseController],
  providers: [
    ParseService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class ParseModule {}
