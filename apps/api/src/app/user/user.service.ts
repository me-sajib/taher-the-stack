import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { ResetPassDto, UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaClientService) {}

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

  async resetPassword(userId: string, body: ResetPassDto) {
    const { password } = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        password: true,
      },
    });

    const isValid = await argon.verify(password, body.currentPassword);

    if (isValid) {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: await argon.hash(body.newPassword),
        },
      });

      return {
        message: 'Password changed successfully',
      };
    }

    return new ForbiddenException('Password incorrect');
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
    return updateUser;
  }
}
