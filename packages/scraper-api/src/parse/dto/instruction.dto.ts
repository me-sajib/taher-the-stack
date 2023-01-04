import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { ClickOption } from './clickOption.dto';
import { FillDto } from './fill.dto';
import { ScrollOption } from './scrollOption.dto';

export class InstructionDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'wait',
    type: Number,
    required: false,
    description:
      'The amount of time to wait'
  })
  wait?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'wait_for',
    type: String,
    required: false,
    description:
      'The amount of time to wait for the specific node appear'
  })
  wait_for?: string;

  @IsOptional()
  @ApiProperty({
    name: 'wait_for_and_click',
    type: ClickOption,
    required: false,
    description:
      'The amount of time to wait for the specific node appear & click, you can also a valid selector string'
  })
  wait_for_and_click?:
    | string
    | ClickOption;

  @IsOptional()
  @ApiProperty({
    name: 'click',
    type: ClickOption,
    required: false,
    description:
      'The element your want to click, you can pass a valid selector string as well'
  })
  click?: string | ClickOption;

  @IsOptional()
  @ApiProperty({
    name: 'scroll_x',
    type: ScrollOption,
    required: false,
    description:
      'The scroll functionality on X axis, you can pass also number which will be used as px'
  })
  scroll_x?: number | ScrollOption;

  @IsOptional()
  @ApiProperty({
    name: 'scroll_y',
    type: ScrollOption,
    required: false,
    description:
      'The scroll functionality on Y axis, you can pass also number which will be used as px'
  })
  scroll_y?: number | ScrollOption;

  @IsOptional()
  @ApiProperty({
    name: 'fill',
    type: FillDto,
    required: false,
    description:
      'The input filed option, when you would like fill any input filed'
  })
  fill?: FillDto;

  @IsOptional()
  evaluate?: string;
}
