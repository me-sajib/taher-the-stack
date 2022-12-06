import { Body, Controller, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckService } from './check.service';
import { BodyDto } from './dto';

@Controller('proxy-list/check')
export class CheckController {
  constructor(private checkProxyService: CheckService) {}

  @Patch()
  @ApiOperation({
    tags: ['Proxy list'],
    summary: 'This endpoint check the proxy list status',
    description:
      'This endpoint will check passed list of proxy list and return the proxy check status map with key',
  })
  @ApiResponse({
    status: 200,
    description: 'This will return proxy list map with updated status',
  })
  checkProxyList(@Body() body: BodyDto) {
    return this.checkProxyService.checkProxyList(body);
  }
}
