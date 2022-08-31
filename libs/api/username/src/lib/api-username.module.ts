import { ApiPrismaModule } from '@api/prisma';
import { Module } from '@nestjs/common';
import { UsernameController } from './username/username.controller';
import { UsernameService } from './username/username.service';

@Module({
  imports: [ApiPrismaModule],
  controllers: [UsernameController],
  providers: [UsernameService],
  exports: [],
})
export class ApiUsernameModule {}
