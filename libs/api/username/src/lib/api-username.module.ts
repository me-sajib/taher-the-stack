import { Module } from '@nestjs/common';
import { UsernameController } from './username/username.controller';
import { UsernameService } from './username/username.service';

@Module({
  controllers: [UsernameController],
  providers: [UsernameService],
  exports: [],
})
export class ApiUsernameModule {}
