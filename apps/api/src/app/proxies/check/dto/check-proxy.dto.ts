import { IsNumber } from 'class-validator';

export class BodyDto {
  @IsNumber(
    {},
    {
      each: true,
    }
  )
  checkProxyIds: number[];
}
