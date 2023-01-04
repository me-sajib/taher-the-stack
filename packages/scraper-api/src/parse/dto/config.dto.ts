import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { Protocol } from 'puppeteer';

export class ProvidedCaptchaDto {
  id: string;
  token: string;
}

export class ConfigPageDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'window_height',
    type: Number,
    required: false,
    description:
      'The height of the view port'
  })
  window_height?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'window_width',
    type: Number,
    required: false,
    description:
      'The width of the view port'
  })
  window_width?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'device',
    enum: ['desktop', 'mobile'],
    required: false,
    description:
      'The type of device from you would like to send request'
  })
  device?: 'desktop' | 'mobile';

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'own_proxy',
    type: String,
    required: false,
    description:
      'The specific proxy server url from you would like to sent request'
  })
  own_proxy?: string;

  @IsOptional()
  @ApiProperty({
    name: 'block_resource',
    type: [String],
    required: false,
    description:
      'The list of file extension you would like to block on request event'
  })
  block_resource?: string[];

  @IsOptional()
  @ApiProperty({
    name: 'cookies',
    type: Array<Protocol.Network.CookieParam>,
    required: false,
    description: 'The list of cookies'
  })
  cookies?: Protocol.Network.CookieParam[];

  @IsOptional()
  @ApiProperty({
    name: 'block_resource',
    type: Array<Protocol.Network.CookieParam>,
    required: false,
    description: 'The list of cookies'
  })
  block_ads?: boolean;

  @IsOptional()
  @ApiProperty({
    name: 'captcha',
    type: ProvidedCaptchaDto,
    required: false,
    description:
      'The captcha solve info'
  })
  captcha?: ProvidedCaptchaDto;

  @IsOptional()
  @ApiProperty({
    name: 'captcha_solve',
    type: Boolean,
    required: false,
    default: false,
    description:
      'The captcha solve by default service'
  })
  captcha_solve?: boolean;

  @IsOptional()
  @ApiProperty({
    name: 'captcha_solve',
    type: Boolean,
    required: false,
    default: false,
    description:
      'The switch of stealth mode'
  })
  stealth_mode?: boolean;
}
