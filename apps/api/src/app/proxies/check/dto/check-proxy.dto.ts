import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BodyDto {
  @ApiProperty({
    name: 'checkProxyIds',
    description: 'Number of ids to check all proxies',
    type: [Number],
    default: [],
  })
  @IsNumber(
    {},
    {
      each: true,
    }
  )
  checkProxyIds: number[];
}
