import ApiPrismaService from '@api/prisma';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { UserDto } from '../dto';

@Injectable()
export class UsernameService {
  constructor(private prisma: ApiPrismaService) {}

  async getUser(dto: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (user) {
      delete user.password;
      Logger.log(`GET:/${user.username}`);
      return user;
    }

    throw new ForbiddenException('Credential not exist');
  }

  async deleteUser(dto: UserDto) {
    await this.prisma.user.delete({
      where: {
        id: dto.userId,
      },
    });

    Logger.log(`DELETE:/${dto.username}`);

    return {
      message: `${dto.username} deleted successfully`,
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

    delete updateUser.password;

    Logger.log(`UPDATE:/${updateUser.username}`);
    console.log({ updateUser });
    return updateUser;
  }
}
