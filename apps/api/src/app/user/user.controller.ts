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
import { UserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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
    return this.userService.updateUser(req.user.userId, updatedUser);
  }
}
