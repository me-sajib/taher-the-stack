import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { Response } from 'express';
import { isUniqueError } from 'utils';
import { PrismaClientService } from '../prisma-client/prisma-client.service';
import { AuthSigninDto, AuthSignupDto } from './dto';

interface JWTDto {
  userId: string;
  username: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClientService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  private DAY: number = 24 * 60 * 60 * 1e3;

  async register(dto: AuthSignupDto, res: Response) {
    const { remember, ...regDto } = dto;
    dto.password = await argon.hash(regDto.password);

    try {
      const user: User = await this.prisma.user.create({
        data: regDto,
      });

      Logger.log(`${user.username} successfully registered`);

      const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
      };

      await this.signToken(payload, remember, res);

      return new HttpException('Signed up successfully', HttpStatus.ACCEPTED);
    } catch (e) {
      const uniqueError = isUniqueError(e);
      if (uniqueError) {
        return uniqueError;
      }

      throw e;
    }
  }

  async login(dto: AuthSigninDto, res: Response) {
    const { email, username, password, remember } = dto;

    const user: User = await this.prisma.user.findUnique({
      where: email ? { email } : { username }, // optional login with email or username
    });

    const forbiddenError = new ForbiddenException('Incorrect Credential');

    if (!user) {
      Logger.error('Incorrect login Credential');

      return forbiddenError;
    }

    const isValidPass = await argon.verify(user.password, password);

    if (isValidPass) {
      Logger.log(`${user.username} successfully sign in`);

      const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
      };

      await this.signToken(payload, remember, res);

      return new HttpException('Signed in successfully', HttpStatus.ACCEPTED);
    }

    Logger.error('Incorrect login Credential');
    return forbiddenError;
  }

  async logout(res: Response) {
    res.clearCookie('auth-cookie');

    return new HttpException('Signed out successfully', HttpStatus.OK);
  }

  private async signToken(
    jwtPayload: JWTDto,
    isRemember: boolean,
    res: Response
  ) {
    const { userId, username, email } = jwtPayload;
    const payload = {
      sub: userId,
      email,
      username,
    };

    const secret: string = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret,
    });

    res.cookie(
      'auth-cookie',
      token,
      Object.assign(
        { httpOnly: true, secure: true },
        isRemember && {
          expires: new Date(new Date().getTime() + 1 * this.DAY),
        }
      )
    );
  }
}
