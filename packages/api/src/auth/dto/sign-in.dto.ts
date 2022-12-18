import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class AuthSigninDto {
  @IsNotEmpty()
  @ApiProperty({
    name: 'identifier',
    description: 'The identifier of an user it would be email or username',
    default: '',
    type: String,
  })
  identifier: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'password',
    description: 'The password of an user',
    default: '',
    type: String,
  })
  password: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'remember',
    description: 'The remember status for next time login',
    required: false,
    default: false,
    type: Boolean,
  })
  remember: boolean;
}
