import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class ProxyListGetDtoQuery {
  @IsOptional()
  @ApiProperty({
    name: 'includeProxies',
    type: Boolean,
    required: false,
    description:
      'If you would like to take proxies as well then change the value to `true`'
  })
  includeProxies?: boolean;
}

export class ProxyListBulkQueryDto {
  @IsOptional()
  @IsUUID('all', {
    each: true
  })
  @ApiProperty({
    name: 'listKeys',
    required: false,
    description: 'The list of proxy list key',
    type: [String]
  })
  listKeys: string[];
}
