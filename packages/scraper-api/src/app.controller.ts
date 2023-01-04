import {
  Controller,
  Get,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';
@Controller()
export class AppController {
  @Get('health')
  @ApiOperation({
    tags: ['health'],
    summary: 'Check health of API'
  })
  @ApiResponse({
    status: 200,
    description: 'The ok message'
  })
  async health() {
    return new HttpException(
      'I am ok ;)',
      HttpStatus.OK
    );
  }
}
