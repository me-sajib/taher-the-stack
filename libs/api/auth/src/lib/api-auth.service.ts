import ApiPrismaService from '@api/prisma';
import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import * as argon from 'argon2';
import { AuthSigninDto, AuthSignupDto } from './dto';

@Injectable()
export class ApiAuthService {
  constructor(
    private prisma: ApiPrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async register(dto: AuthSignupDto) {
    dto.password = await argon.hash(dto.password);

    try {
      const user: User = await this.prisma.user.create({
        data: dto,
      });

      Logger.log(`${user.username} successfully registered`);
      return this.signToken(user.id, user.email);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          const uniqueProp: string = e.message
            .match(/\(`(.+)`\)/g)
            .at(0)
            .replace(/[()`]/g, '');

          // if username & email already registered
          Logger.error('Credential already exist');
          throw new HttpException(
            `${uniqueProp} already registered`,
            HttpStatus.BAD_REQUEST
          );
        }
      }
      throw e;
    }
  }

  async login(dto: AuthSigninDto) {
    const { email, username, password } = dto;

    const user: User = await this.prisma.user.findUnique({
      where: email ? { email } : { username }, // optional login with email or username
    });

    const forbiddenError = new ForbiddenException('Incorrect Credential');

    if (!user) {
      Logger.error('Incorrect login Credential');

      throw forbiddenError;
    }

    const isValidPass = await argon.verify(user.password, password);

    if (isValidPass) {
      Logger.log(`${user.username} successfully sign in`);
      return this.signToken(user.id, user.email);
    }

    Logger.error('Incorrect login Credential');
    return forbiddenError;
  }

  async signToken(
    userId: string,
    email: string
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret: string = this.config.get('JWT_SECRET');

    return {
      access_token: await this.jwt.signAsync(payload, {
        expiresIn: '24h',
        secret,
      }),
    };
  }
}
