import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ParseModule } from './parse/parse.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ParseModule, ConfigModule.forRoot()],
  controllers: [AppController]
})
export class AppModule {}
