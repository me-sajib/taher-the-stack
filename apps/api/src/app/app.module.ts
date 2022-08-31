import { ApiAuthModule } from '@api/auth';
import { ApiUsernameModule } from '@api/username';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ApiAuthModule, ApiUsernameModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
