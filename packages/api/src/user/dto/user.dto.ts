import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateBy,
} from 'class-validator';
import { usernameValidator } from '../../custom-validators';

export interface UserDto {
  userId: string;
  email: string;
  username: string;
}

export class UpdateUser {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    type: String,
    default: '',
    required: false,
    description: 'The valid `email` of an user that you would like to update',
  })
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ValidateBy(...usernameValidator)
  @ApiProperty({
    name: 'username',
    type: String,
    default: '',
    required: false,
    description:
      'The valid `username` of an user that you would like to update',
  })
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
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
  @IsString()
  currentPassword: string;

  @ApiProperty({
    name: 'newPassword',
    type: String,
    default: '',
    description: 'The `newPassword` of an user which will be the new password',
  })
  @IsString()
  newPassword: string;
}
