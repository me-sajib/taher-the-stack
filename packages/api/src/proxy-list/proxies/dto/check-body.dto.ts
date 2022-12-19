import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional
} from 'class-validator';

export class CheckBodyDto {
  @IsOptional()
  @ApiProperty({
    name: 'checkProxyIds',
    description:
      'Number of ids to check all proxies',
    type: [Number],
    required: false,
    default: []
  })
  @IsNumber(
    {},
    {
      each: true
    }
  )
  checkProxyIds?: number[];
}
