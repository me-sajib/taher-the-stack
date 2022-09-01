import { ApiCheckProxyModule } from '@api/check-proxy';
import { ApiPrismaModule } from '@api/prisma';
import { ApiProxyModule } from '@api/proxy';
import { ApiProxyListModule } from '@api/proxy-list';
import { Module } from '@nestjs/common';
import { UsernameController } from './username/username.controller';
import { UsernameService } from './username/username.service';

@Module({
  imports: [
    ApiPrismaModule,
    ApiCheckProxyModule,
    ApiProxyModule,
    ApiProxyListModule,
  ],
  controllers: [UsernameController],
  providers: [UsernameService],
  exports: [],
})
export class ApiUsernameModule {
  // configure(consumer: MiddlewareConsumer) { // TODO: Fix the middleware
  //   consumer.apply(UsernameMiddleware).forRoutes(UsernameController);
  // }
}
