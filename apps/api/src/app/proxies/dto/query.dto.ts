import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class ProxyQueryDto {
  @IsUUID()
  @IsOptional()
  @ApiProperty({
    name: 'proxyListKey',
    description: 'Get proxies by the list key',
    type: String,
    default: '',
  })
  proxyListKey: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      each: true,
    }
  )
  @Min(0, {
    each: true,
  })
  @ApiProperty({
    name: 'proxyIds',
    description: 'The list of proxy id you would like to pick',
    type: [Number],
    default: [],
  })
  proxyIds: number[];
}
