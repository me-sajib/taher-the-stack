import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class FillDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'selector',
    type: String,
    description:
      'The valid input field css selector'
  })
  selector: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'text',
    type: String,
    description:
      'The value text you want to input in that field'
  })
  text: string;

  @IsOptional()
  @ApiProperty({
    name: 'delay',
    type: Number,
    required: false,
    description:
      'The number in ms of type speed'
  })
  delay?: number;
}
