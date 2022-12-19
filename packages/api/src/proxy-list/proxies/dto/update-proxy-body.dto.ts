import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class ProxyUpdateDto {
  @IsNumber()
  @ApiProperty({
    name: 'id',
    description:
      'The proxy id to update',
    type: Number,
    default: 0
  })
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'host',
    description:
      'The ip address of proxy server',
    required: false,
    type: String,
    default: ''
  })
  host: string;

  @IsOptional()
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
  @IsNotEmpty()
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
  @IsNotEmpty()
  @ApiProperty({
    name: 'status',
    required: false,
    description:
      'The status of the proxy server',
    type: String,
    default: 'ACTIVE'
  })
  status:
    | 'ACTIVE'
    | 'INACTIVE'
    | 'CHECKING';

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
  @IsNotEmpty()
  @ApiProperty({
    name: 'lastCheckAt',
    required: false,
    description:
      'The time of last check status of proxy server',
    type: String,
    default: new Date()
  })
  lastCheckAt: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'totalHits',
    required: false,
    description:
      'The number of hits to this proxy server',
    type: Number,
    default: 0
  })
  totalHits: number;
}
