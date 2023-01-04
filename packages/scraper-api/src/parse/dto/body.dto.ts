import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator';
import { ConfigPageDto } from './config.dto';
import { ExtractionDto } from './extraction.dto';
import { InstructionDto } from './instruction.dto';

export class ParseBodyDto {
  @ApiProperty({
    name: 'instructions',
    type: [InstructionDto],
    required: false,
    default: [],
    description:
      'All instruction to interact with the headless browser'
  })
  @IsOptional()
  instructions?: InstructionDto[];

  @IsOptional()
  @ApiProperty({
    name: 'extract',
    type: ExtractionDto,
    required: false,
    default: {},
    description:
      'The extraction structure that you would like to scrape, you can pass a valid css selector string as well'
  })
  extract?: ExtractionDto;

  @IsOptional()
  @ApiProperty({
    name: 'config',
    type: ConfigPageDto,
    required: false,
    default: {},
    description:
      'All instruction to interact with the headless browser'
  })
  config?: ConfigPageDto;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'only_body',
    type: Boolean,
    default: false,
    description:
      'Return only body innerHTML'
  })
  only_body?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'only_text',
    type: Boolean,
    default: false,
    description:
      'Return only body innerText'
  })
  only_text?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'return_page_source',
    type: Boolean,
    default: false,
    description:
      'The return value will be the whole content of the target site'
  })
  return_page_source?: boolean; // from scrapingbee @see -> https://www.scrapingbee.com/documentation/#return_page_source

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'screenshot',
    type: Boolean,
    default: false,
    description:
      'This will return a screenshot Buffer of the target website page'
  })
  screenshot?: boolean; // from scrapingbee @see -> https://www.scrapingbee.com/documentation/#screenshot

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    name: 'screenshot_full_page',
    type: Boolean,
    default: false,
    description:
      'This will return a full screenshot Buffer of the target website page'
  })
  screenshot_full_page?: boolean; // from scrapingbee @see -> https://www.scrapingbee.com/documentation/#screenshot_full_page

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'screenshot_selector',
    type: String,
    default: false,
    description:
      'This will return a screenshot Buffer of a specific node of the target website page'
  })
  screenshot_selector?: string; // from scrapingbee @see -> https://www.scrapingbee.com/documentation/#screenshot_selector
}
