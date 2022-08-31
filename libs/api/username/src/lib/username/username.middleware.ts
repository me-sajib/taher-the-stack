import ApiPrismaService from '@api/prisma';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';

@Injectable()
export class UsernameMiddleware implements NestMiddleware {
  constructor(private prisma: ApiPrismaService) {}
  async use(req: any, _res: any, next: () => void) {
    const { username } = req.params;

    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      return next();
    }

    Logger.error(`${username} username not exist in database`);
    throw new HttpException('Page not found', HttpStatus.NOT_FOUND);
  }
}
