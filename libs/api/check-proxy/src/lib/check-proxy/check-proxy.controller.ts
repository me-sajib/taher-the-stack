/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ParamDto } from '../dto';
import { CheckProxyService } from './check-proxy.service';

@UseGuards(AuthGuard('basic'))
@Controller(':username/check-proxy')
export class CheckProxyController {
  constructor(private checkProxyService: CheckProxyService) {}

  @Get('/:proxyId')
  checkProxy(@Req() req: any, @Param() dto: ParamDto) {
    return this.checkProxyService.checkProxy(req.user, dto);
  }
}
