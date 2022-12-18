import { Body, Controller, Delete, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthSigninDto, AuthSignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({
    tags: ['Auth'],
    summary: 'The sign up endpoint to create new account',
    description:
      '__This endpoint is for create a new account if the passed info is valid `AuthSignupDto` schema then it will set jwt token in the res cookie & return the token__',
  })
  @ApiResponse({
    status: 202,
    description:
      "show the `Signed up successfully` message. You'll get the jwt token",
  })
  @ApiResponse({
    status: 400,
    description: 'If username or email already exist',
  })
  signUp(
    @Body() dto: AuthSignupDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.register(dto, res);
  }

  @Post('sign-in')
  @ApiOperation({
    tags: ['Auth'],
    summary: 'The sign-in endpoint to login an existing user',
    description:
      '__This endpoint is for a log-in existing account if the passed info is valid `AuthSigninDto` schema then it will set jwt token in the res cookie & return the token__',
  })
  @ApiResponse({
    status: 202,
    description:
      "Show the `Signed in successfully` message. You'll get the jwt token",
  })
  @ApiResponse({
    status: 403,
    description: 'It shows a `Incorrect credential` message',
  })
  signIn(
    @Body() dto: AuthSigninDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.login(dto, res);
  }

  @ApiOperation({
    tags: ['Auth'],
    summary: 'The sign-out endpoint',
    description:
      '__This endpoint is for log-out from existing account that already signed in__',
  })
  @ApiResponse({
    status: 200,
    description:
      'show the `Signed out successfully` message, When user logged in',
  })
  @ApiResponse({
    status: 400,
    description:
      "show the `User not logged in` message, When user didn't logged in",
  })
  @Delete('sign-out')
  signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
}
