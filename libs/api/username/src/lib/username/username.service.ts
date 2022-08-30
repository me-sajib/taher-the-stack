import ApiPrismaService from '@api/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon from 'argon2';

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

  async updateUser(userId: string, updatedUser: User) {
    delete updatedUser.id;

    if ('password' in updatedUser) {
      updatedUser.password = await argon.hash(updatedUser.password);
    }

    const updateUser = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updatedUser,
    });

    delete updatedUser.password;

    return updateUser;
  }
}
