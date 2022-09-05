import ApiPrismaService from '@api/prisma';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy as Strategy } from 'passport-http';
import { BasicStrategyDto } from './basic-strategy.dto';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: ApiPrismaService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    _req,
    username: string,
    password: string
  ): Promise<BasicStrategyDto> {
    const proxyList = await this.prisma.proxyList.findUnique({
      where: {
        username,
      },
    });

    if (proxyList.password !== password) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return {
      username,
      password,
    };
  }
}
