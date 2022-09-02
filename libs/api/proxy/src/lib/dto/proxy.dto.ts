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

export class ProxyUpdateDto {
  @IsNumber()
  @Min(0)
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
