import { ApiPrismaModule } from '@api/prisma';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsernameController } from './username/username.controller';
import { UsernameMiddleware } from './username/username.middleware';
import { UsernameService } from './username/username.service';

@Module({
  imports: [ApiPrismaModule],
  controllers: [UsernameController],
  providers: [UsernameService],
  exports: [],
})
export class ApiUsernameModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UsernameMiddleware).forRoutes(UsernameController);
  }
}
