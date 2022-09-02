import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProxyDto, ProxyQueryDto } from '../dto';
import { ProxyService } from './proxy.service';

@UseGuards(AuthGuard('jwt'))
@Controller(':username')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @Post('/proxy')
  createProxy(@Body() dto: ProxyDto) {
    return this.proxyService.createProxy(dto);
  }

  @Get('/proxies')
  getBulkProxies(@Body() dto: ProxyQueryDto) {
    return this.proxyService.getBulkProxies(dto.proxyIds);
  }
}
