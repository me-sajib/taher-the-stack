import { Controller, Post } from '@nestjs/common';
import { AuthService } from './api-auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  signUp() {
    return this.authService.register();
  }

  @Post('sign-in')
  singIn() {
    return this.authService.login();
  }
}
