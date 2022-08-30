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
import { UserDto } from '../dto';
import { UsernameService } from './username.service';
@UseGuards(AuthGuard('jwt'))
@Controller(':username')
export class UsernameController {
  constructor(private userService: UsernameService) {}

  @Get()
  getUser(@Req() req: any) {
    return this.userService.getUser(req.user as UserDto);
  }

  @Delete()
  deleteUser(@Req() req: any) {
    return this.userService.deleteUser(req.user as UserDto);
  }

  @Patch()
  updateUser(@Req() req: any, @Body() updatedUser: User) {
    return this.userService.updateUser(req.user.id, updatedUser);
  }
}
