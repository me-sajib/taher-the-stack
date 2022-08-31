import { IsNotEmpty, IsString, MinLength } from 'class-validator';

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

  @IsNotEmpty()
  @IsString()
  userId: string;
}
