import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProxyDto } from '../dto';
import { ProxyService } from './proxy.service';

@UseGuards(AuthGuard('jwt'))
@Controller(':username/proxies')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @Post()
  createProxy(@Body() dto: ProxyDto) {
    return this.proxyService.createProxy(dto);
  }
}
