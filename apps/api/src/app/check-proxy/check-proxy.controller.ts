import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckProxyService } from './check-proxy.service';
import { ParamDto } from './dto';

@UseGuards(AuthGuard('basic'))
@Controller('check-proxy')
export class CheckProxyController {
  constructor(private checkProxyService: CheckProxyService) {}

  @Get('/:proxyId')
  checkProxy(@Req() req: any, @Param() dto: ParamDto) {
    return this.checkProxyService.checkProxy(req.user, dto);
  }
}
