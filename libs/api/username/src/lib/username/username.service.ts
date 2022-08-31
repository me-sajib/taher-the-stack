import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsernameService {
  getUser(paramsUsername: string, user: User) {
    if (paramsUsername === user.username) {
      delete user.password;
      return user;
    }

    throw new ForbiddenException('Invalid credential');
  }
}
