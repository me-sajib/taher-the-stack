import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    tags: ['Health'],
    summary: 'The condition of API'
  })
  @ApiResponse({
    status: 200,
    description: 'It returns a message "I am Ok ;)"'
  })
  getHealth() {
    return this.appService.getHealth();
  }
}
