import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProxyListBulkDto, ProxyListDto } from '../dto';
import { ProxyListService } from './proxy-list.service';

@UseGuards(AuthGuard('jwt'))
@Controller(':username/proxy-list')
export class ProxyListController {
  constructor(private proxyListService: ProxyListService) {}

  @Post()
  createProxyList(@Body() dto: ProxyListDto) {
    return this.proxyListService.createProxyList(dto);
  }

  @Get()
  getBulkProxyLists(@Body() dto: ProxyListBulkDto) {
    return this.proxyListService.getBulkProxyLists(dto.listKeys);
  }

  @Delete()
  deleteBulkProxyLists(@Body() dto: ProxyListBulkDto) {
    return this.proxyListService.deleteBulkProxyList(dto.listKeys);
  }
}
