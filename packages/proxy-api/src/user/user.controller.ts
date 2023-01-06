import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { ResetPassDto, UpdateUser, UserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    tags: ['User'],
    summary: 'The `User` object will be returned',
    description:
      '__This endpoint will take the jwt token from the cookie and return the specific User__'
  })
  @ApiResponse({
    status: 200,
    description: 'It returns the user object based on the jwt token'
  })
  getUser(@Req() req: Request) {
    return this.userService.getUser(req.user as UserDto);
  }

  @Patch('/password-reset')
  @ApiOperation({
    tags: ['User'],
    summary: 'Update `password` of an user',
    description:
      '__This endpoint will take the jwt token from the cookie and take `ResetPassBody` schema from body to update the user password__'
  })
  @ApiResponse({
    status: 200,
    description:
      'It shows a `Password changed successfully` message If the password updated successfully'
  })
  @ApiResponse({
    status: 403,
    description:
      'It shows a `Password incorrect` message If the `currentPassword` passed incorrect'
  })
  resetPassword(@Req() req: Request, @Body() body: ResetPassDto) {
    return this.userService.resetPassword(
      (req.user as UserDto).userId,
      body
    );
  }

  @Delete('/delete')
  @ApiOperation({
    tags: ['User'],
    summary: 'Delete an user',
    description:
      '__This endpoint will take the jwt token from the cookie and delete the user after taking the__ `userId`'
  })
  @ApiResponse({
    status: 200,
    description:
      'It shows a `:username: deleted successfully` message after deletion successfully'
  })
  deleteUser(@Req() req: Request) {
    return this.userService.deleteUser(req.user as UserDto);
  }

  @Patch('/update')
  @ApiOperation({
    tags: ['User'],
    summary: 'Update the info of an user',
    description:
      '__This endpoint will take the jwt token from the cookie and take `UpdateUser` schema from body to update the user info__'
  })
  @ApiResponse({
    status: 200,
    description: 'It shows the updated `User`'
  })
  @ApiResponse({
    status: 403,
    description:
      'It shows a unique error if the unique info like `username` & `email` already exist in the database'
  })
  updateUser(@Req() req: Request, @Body() updatedUser: UpdateUser) {
    return this.userService.updateUser(
      (req.user as UserDto).userId,
      updatedUser
    );
  }
}
