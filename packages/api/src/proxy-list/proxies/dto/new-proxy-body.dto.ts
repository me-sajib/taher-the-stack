import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

export class ProxyCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'host',
    description:
      'The ip address of proxy server',
    type: String,
    default: ''
  })
  host: string;

  @IsNumber()
  @ApiProperty({
    name: 'port',
    description:
      'Valid proxy port number',
    type: Number,
    default: 3000
  })
  port: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'country',
    required: false,
    description:
      'The country name of the server',
    type: String,
    default: ''
  })
  country: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'username',
    required: false,
    description:
      'The username of the proxy server',
    type: String,
    default: ''
  })
  username: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'password',
    required: false,
    description:
      'The password of the proxy server',
    type: String,
    default: ''
  })
  password: string;

  @IsUUID()
  @ApiProperty({
    name: 'proxyListKey',
    description:
      'The proxy list key where will be listed this proxy',
    type: String,
    default: ''
  })
  proxyListKey: string;
}
