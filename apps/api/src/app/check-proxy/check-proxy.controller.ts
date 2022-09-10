import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckProxyService } from './check-proxy.service';
import { ParamDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('check-proxy')
export class CheckProxyController {
  constructor(private checkProxyService: CheckProxyService) {}

  @Get('/:proxyId')
  checkProxy(@Param() dto: ParamDto, @Query('list_key') listKey: string) {
    return this.checkProxyService.checkProxy(dto, listKey);
  }
}
