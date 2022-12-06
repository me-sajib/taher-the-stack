import { ApiProperty } from '@nestjs/swagger';

export interface UserDto {
  userId: string;
  email: string;
  username: string;
}

export class UpdateUser {
  @ApiProperty({
    name: 'email',
    type: String,
    default: '',
    required: false,
    description: 'The valid `email` of an user that you would like to update',
  })
  email?: string;

  @ApiProperty({
    name: 'username',
    type: String,
    default: '',
    required: false,
    description:
      'The valid `username` of an user that you would like to update',
  })
  username?: string;

  @ApiProperty({
    name: 'fullname',
    type: String,
    default: '',
    required: false,
    description: 'The `fullname` of an user that you would like to update',
  })
  fullname?: string;
}

export class ResetPassDto {
  @ApiProperty({
    name: 'currentPassword',
    type: String,
    default: '',
    description:
      'The `currentPassword` of an user that you would like to update',
  })
  currentPassword: string;

  @ApiProperty({
    name: 'newPassword',
    type: String,
    default: '',
    description: 'The `newPassword` of an user which will be the new password',
  })
  newPassword: string;
}
