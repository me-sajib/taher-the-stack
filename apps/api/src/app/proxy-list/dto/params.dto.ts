import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ProxyListParamDto {
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
}
