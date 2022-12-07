import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CheckProxyListBody {
  @IsUUID('all', {
    each: true,
  })
  @ApiProperty({
    name: 'checkProxyListIds',
    description:
      'The list of proxy-list key to identify which proxy lists will be re-check',
    type: [String],
    default: [],
  })
  checkProxyListIds: string[];
}
