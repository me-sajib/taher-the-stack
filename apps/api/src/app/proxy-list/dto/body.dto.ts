import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class ProxyListBodyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'name',
    description: 'The name of the proxy list',
    type: String,
    default: '',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'username',
    description: 'The username of the proxy list',
    type: String,
    default: '',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty({
    name: 'password',
    description: 'The password of the proxy list',
    type: String,
    default: '',
  })
  password: string;
}

export class ProxyListBodyBulkDto {
  @IsOptional()
  @IsUUID('all', {
    each: true,
  })
  @ApiProperty({
    name: 'listKeys',
    description: 'The list of proxy list key',
    type: [String],
    default: [],
  })
  listKeys: string[];
}
