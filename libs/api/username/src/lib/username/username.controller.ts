import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UsernameService } from './username.service';

@Controller(':username')
export class UsernameController {
  constructor(private userService: UsernameService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUser(@Param('username') username: string, @Req() req: any) {
    return this.userService.getUser(req.user as User);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('username') username: string, @Req() req: any) {
    return this.userService.deleteUser(req.user as User);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @Param('username') username: string,
    @Req() req: any,
    @Body() updatedUser: User
  ) {
    return this.userService.updateUser(req.user.id, updatedUser);
  }
}
