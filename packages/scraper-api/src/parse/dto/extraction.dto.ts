import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';

export class ExtractionDto {
  [key: string]: string | ExtractOption;
}

export class ExtractOption {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'selector',
    type: String,
    required: false,
    description: 'The css selector of an element you want to scrape'
  })
  selector: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'selector',
    enum: ['item', 'list'],
    required: false,
    description: 'The out put amount type'
  })
  type?: 'item' | 'list';

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'selector',
    type: ExtractionDto,
    required: false,
    description: 'The out put amount type'
  })
  output?: string | ExtractionDto;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'clean',
    type: Boolean,
    required: false,
    description: 'The boolean value of cleaner'
  })
  clean?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    name: 'parent',
    type: String,
    required: false,
    description: 'The css selector of parent element'
  })
  parent?: string;
}
