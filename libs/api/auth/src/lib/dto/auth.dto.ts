import {
  IsEmail,
  IsNotEmpty,
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
      validate: ([first, ...rest]: string[]) =>
        !/\d|[A-Z]/.test(first) &&
        rest.every((letter) => /[a-z]|\d/.test(letter)),
    },
  },
  {
    message: 'username must be lowercase & start with alphabets',
  },
];

class SininWithUsername {
  @IsNotEmpty()
  @IsEmail()
  @ValidateBy(...usernameValidator)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
class SigninWithEmail {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}

export type AuthSigninDto = SigninWithEmail | SininWithUsername;

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
}
