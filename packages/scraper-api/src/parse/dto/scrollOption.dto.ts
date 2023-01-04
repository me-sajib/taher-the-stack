import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';

export class ScrollOption {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'selector',
    type: String,
    description:
      'The valid css selector that you want to select for scroll action'
  })
  selector: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'amount',
    type: Number,
    description:
      'The number of px you want to trigger the scroll action per each scroll count'
  })
  amount: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'delay',
    required: false,
    type: Number,
    description:
      'The number of delay time you want to trigger the scroll action'
  })
  delay?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    name: 'scrollCount',
    required: false,
    type: Number,
    description: 'The number you want to trigger the scroll action'
  })
  scrollCount?: number;

  @ApiProperty({
    name: 'behavior',
    required: false,
    enum: ['auto', 'smooth'],
    description: 'The behavior of scroll action'
  })
  @IsOptional()
  behavior?: 'auto' | 'smooth';
}
