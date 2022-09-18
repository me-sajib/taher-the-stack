import { IsObject } from 'class-validator';

interface CheckProxy {
  listKey: string;
  ids: number[];
}

export class BodyDto {
  @IsObject({
    each: true,
  })
  checkList: CheckProxy[];
}
