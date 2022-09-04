import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { BasicStrategyDto } from '../basic-strategy/basic-strategy.dto';
import { CheckProxyService } from './check-proxy.service';
import { ParamDto } from './dto';

@UseGuards(AuthGuard('basic'))
@Controller('check-proxy')
export class CheckProxyController {
  constructor(private checkProxyService: CheckProxyService) {}

  @Get('/:proxyId')
  checkProxy(@Req() req: Request, @Param() dto: ParamDto) {
    return this.checkProxyService.checkProxy(req.user as BasicStrategyDto, dto);
  }
}
