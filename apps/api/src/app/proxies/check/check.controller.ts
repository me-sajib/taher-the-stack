import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CheckService } from './check.service';
import { BodyDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('proxies/check')
export class CheckController {
  constructor(private checkService: CheckService) {}

  // TODO: Have to move to the proxy controller
  @Patch()
  @ApiOperation({
    tags: ['Proxy'],
    summary: 'This endpoint can check the proxy status',
    description:
      'This endpoint will check passed list of proxy and return the proxy check status',
  })
  @ApiResponse({
    status: 200,
    description: 'This will return proxy map with status',
  })
  checkProxies(@Body() dto: BodyDto) {
    return this.checkService.checkProxies(dto);
  }
}
