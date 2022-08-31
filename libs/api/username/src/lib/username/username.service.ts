import ApiPrismaService from '@api/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsernameService {
  constructor(private prisma: ApiPrismaService) {}

  getUser(user: User) {
    delete user.password;
    return user;
  }

  async deleteUser(user: User) {
    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return {
      message: `${user.username} deleted successfully`,
    };
  }
}
