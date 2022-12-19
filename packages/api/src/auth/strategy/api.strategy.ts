import {
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import {
  ExtractJwt,
  Strategy
} from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy
) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest:
        ExtractJwt.fromExtractors([
          (req: Request) => {
            const token =
              req?.cookies[
                'auth-cookie'
              ];

            if (!token) {
              return null;
            }

            return token;
          }
        ]),
      ignoreExpiration: false,
      secretOrKey: config.get(
        'JWT_SECRET'
      )
    });
  }

  async validate(payload) {
    if (payload === null) {
      throw new UnauthorizedException();
    }

    const { sub, ...reset } = payload;

    return {
      userId: sub,
      ...reset
    };
  }
}
