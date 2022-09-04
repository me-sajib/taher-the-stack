import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class ProxyDto {
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsNumber()
  port: number;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsNumber()
  totalHits: number;

  @IsString()
  @IsNotEmpty()
  status: 'ACTIVE' | 'INACTIVE';

  @IsUUID()
  proxyListId: string;
}

export class ProxyQueryDto {
  @IsUUID()
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
  proxyIds: number[];
}

export class ProxyUpdateDto {
  @IsUUID()
  proxyListId: string;

  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  host: string;

  @IsOptional()
  @IsNumber()
  port: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsNumber()
  totalHits: number;
}
