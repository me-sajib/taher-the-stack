import { Body, Controller, Post } from '@nestjs/common';
import { ApiAuthService } from './api-auth.service';
import { AuthSigninDto, AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: ApiAuthService) {}

  @Post('sign-up')
  signUp(@Body() dto: AuthSignupDto) {
    return this.authService.register(dto);
  }

  @Post('sign-in')
  signIn(@Body() dto: AuthSigninDto) {
    return this.authService.login(dto);
  }
}
