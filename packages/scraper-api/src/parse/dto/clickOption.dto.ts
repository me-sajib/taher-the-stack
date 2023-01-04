import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

type MouseButton =
  | 'left'
  | 'right'
  | 'middle'
  | 'back'
  | 'forward';

export class ClickOption {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'selector',
    type: String,
    description:
      'The valid css selector that you want to click'
  })
  selector: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'delay',
    type: Number,
    required: false,
    description:
      'The time delay to click'
  })
  delay?: number;

  @IsOptional()
  @ApiProperty({
    name: 'button',
    type: String,
    required: false,
    description:
      'The exact button to click like: left | right | middle | back | forward'
  })
  button?: MouseButton;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'clickCount',
    type: Number,
    required: false,
    description:
      'The number of count to click'
  })
  clickCount?: number;
}
