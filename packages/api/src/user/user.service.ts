import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as argon from 'argon2';
// import { isUniqueError } from 'utils';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { ResetPassDto, UpdateUser, UserDto } from './dto';

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
    Logger.log('Change password, User input ->', body);
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

      return new HttpException('Password changed successfully', HttpStatus.OK);
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

    return new HttpException(
      `${dto.username} deleted successfully`,
      HttpStatus.OK
    );
  }

  async updateUser(userId: string, updatedUser: UpdateUser) {
    try {
      console.log({ updatedUser });
      const updateUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: updatedUser,
      });

      Logger.log(`UPDATE:/${updateUser.username}`);
      return updateUser;
    } catch (e) {
      // const uniqueError = isUniqueError(e);

      // if (uniqueError) {
      //   return uniqueError;
      // }
      return e;
    }
  }
}
