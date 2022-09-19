import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthSigninDto, AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp(
    @Body() dto: AuthSignupDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.register(dto, res);
  }

  @Post('sign-in')
  signIn(
    @Body() dto: AuthSigninDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(dto, res);
  }

  @Delete('sign-out')
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
