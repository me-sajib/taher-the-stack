import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUser(@Req() req: Request) {
    return this.userService.getUser(req.user as UserDto);
  }

  @Delete()
  deleteUser(@Req() req: Request) {
    return this.userService.deleteUser(req.user as UserDto);
  }

  @Patch()
  updateUser(@Req() req: Request, @Body() updatedUser: User) {
    return this.userService.updateUser(
      (req.user as UserDto).userId,
      updatedUser
    );
  }
}
