import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ProxyQueryDto {
  @IsOptional()
  @ApiProperty({
    name: 'proxyListKey',
    description:
      'Get proxies by the list key',
    required: false,
    type: String,
    default: ''
  })
  proxyListKey: string;

  @IsOptional()
  @ApiProperty({
    name: 'proxyIds',
    description:
      'The list of proxy id you would like to pick',
    required: false,
    type: [String],
    default: []
  })
  proxyIds: string[];
}
