import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

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
