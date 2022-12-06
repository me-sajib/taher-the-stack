import {
  BadRequestException,
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
import { Request, Response } from 'express';
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
  private readonly DAY: number = 24 * 60 * 60 * 1e3;
  private readonly AUTH_COOKIE_KEY = 'auth-cookie';

  private isValidMail(mail: string) {
    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(mail.trim());
  }

  async register(dto: AuthSignupDto, res: Response) {
    const { remember, ...regDto } = dto;
    regDto.password = await argon.hash(regDto.password);

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

      const token = await this.signToken(payload, remember, res);

      return {
        ...new HttpException('Signed up successfully', HttpStatus.ACCEPTED),
        token,
      };
    } catch (e) {
      const uniqueError = isUniqueError(e);
      if (uniqueError) {
        return uniqueError;
      }

      throw e;
    }
  }

  async login(dto: AuthSigninDto, res: Response) {
    const { identifier, password, remember } = dto;

    const emailOrUsername = Object.assign(
      {},
      this.isValidMail(identifier)
        ? { email: identifier }
        : { username: identifier }
    );

    const user: User = await this.prisma.user.findUnique({
      where: emailOrUsername, // optional login with email or username
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

      const token = await this.signToken(payload, remember, res);

      return {
        ...new HttpException('Signed in successfully', HttpStatus.ACCEPTED),
        token,
      };
    }

    Logger.error('Incorrect login Credential');
    return forbiddenError;
  }

  async logout(req: Request, res: Response) {
    if (this.AUTH_COOKIE_KEY in req.cookies) {
      res.clearCookie(this.AUTH_COOKIE_KEY);
      return new HttpException('Signed out successfully', HttpStatus.OK);
    }

    return new BadRequestException('User not logged in');
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
      this.AUTH_COOKIE_KEY,
      token,
      Object.assign(
        { httpOnly: true, secure: true },
        isRemember && {
          expires: new Date(new Date().getTime() + 1 * this.DAY),
        }
      )
    );

    return `Bearer ${token}`;
  }
}
