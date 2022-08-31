import { Controller, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsernameService } from './username.service';

@Controller(':username')
export class UsernameController {
  constructor(private userService: UsernameService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUser(@Param('username') username: string, @Req() req: any) {
    return this.userService.getUser(username, req.user as User);
  }
}
