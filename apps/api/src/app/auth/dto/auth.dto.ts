import { validateUsername } from 'utils';

import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateBy,
  ValidateByOptions,
  ValidationOptions,
} from 'class-validator';

const usernameValidator: [ValidateByOptions, ValidationOptions] = [
  {
    name: 'username',
    validator: {
      validate: validateUsername,
    },
  },
  {
    message: 'username must be lowercase & start with alphabets',
  },
];

export class SininWithUsernameDto {
  @IsNotEmpty()
  @IsEmail()
  @ValidateBy(...usernameValidator)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @IsOptional()
  @IsBoolean()
  remember: boolean;
}

export class SigninWithEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @IsOptional()
  @IsBoolean()
  remember: boolean;
}

export type AuthSigninDto = SigninWithEmailDto & SininWithUsernameDto;

export class AuthSignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ValidateBy(...usernameValidator)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;

  @IsOptional()
  @IsBoolean()
  remember: boolean;
}
