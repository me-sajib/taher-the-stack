import { IsUUID } from 'class-validator';

export class BodyDto {
  @IsUUID('all', {
    each: true,
  })
  checkProxyListIds: string[];
}
