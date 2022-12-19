import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength
} from 'class-validator';

export class ProxyListUpdateDto {
  @IsUUID()
  @ApiProperty({
    name: 'key',
    description:
      'The key of the proxy list you would like to update',
    type: String,
    default: ''
  })
  key: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'name',
    description:
      'The name of the proxy list',
    required: false,
    type: String,
    default: ''
  })
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'username',
    description:
      'The username of the proxy list',
    required: false,
    type: String,
    default: ''
  })
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'password',
    description:
      'The password of the proxy list',
    required: false,
    type: String,
    default: ''
  })
  password: string;
}
