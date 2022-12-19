import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateBy
} from 'class-validator';
import { usernameValidator } from '../../custom-validators';

export class AuthSignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    name: 'fullname',
    description:
      'The full name of an user',
    default: '',
    type: String
  })
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ValidateBy(...usernameValidator)
  @ApiProperty({
    name: 'username',
    description:
      'The username of an user',
    default: '',
    type: String
  })
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    name: 'email',
    description: 'The email of an user',
    default: '',
    type: String
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'password',
    description:
      'The password of an user',
    default: '',
    type: String
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'remember',
    description:
      'The remember status for next time login',
    required: false,
    default: false,
    type: Boolean
  })
  remember: boolean;
}
