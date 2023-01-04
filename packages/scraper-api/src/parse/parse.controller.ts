import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Query,
  Req
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { ParseBodyDto, ParseQueryDto } from './dto';
import { ParseService } from './parse.service';

@Controller('parse')
export class ParseController {
  constructor(private parseService: ParseService) {}

  @Get()
  @ApiOperation({
    tags: ['scrape'],
    summary: 'Instruct and scrape data from any site',
    description: `
      This endpoint handles all types of scrapping functionality like
        1. Configuration of the headless browser
        2. Handle the browser interactivity by Instruction
        3. Scrape data via Extract property
        
      These all actions will be able when you pass a valid \`access_token\` & \`url\` in the query param.

      NOTE:  For more interactivity, the \`render\` query param must be true 
    `
  })
  @ApiResponse({
    status: 200,
    description: 'The scraped data based on the body command'
  })
  async parse(
    @Query() queryDto: ParseQueryDto,
    @Body() bodyDto: ParseBodyDto,
    @Req() req: Request
  ) {
    if (
      this.parseService.validateAccessToken(queryDto.access_token)
    ) {
      return this.parseService.parse(queryDto, bodyDto, req);
    }

    throw new ForbiddenException('Invalid access token');
  }
}
