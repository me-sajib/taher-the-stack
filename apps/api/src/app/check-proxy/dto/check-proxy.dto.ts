import { IsNotEmpty } from 'class-validator';

export class ParamDto {
  @IsNotEmpty()
  proxyId: string;
}
