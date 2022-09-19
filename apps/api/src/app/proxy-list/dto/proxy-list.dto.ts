import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class ProxyListDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
export class ProxyListParamDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;
}

export class ProxyListBulkDto {
  @IsOptional()
  @IsUUID('all', {
    each: true,
  })
  listKeys: string[];
}

export class ProxyListUpdateDto {
  @IsUUID()
  key: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
