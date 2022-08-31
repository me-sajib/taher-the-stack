import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProxyDto, ProxyQueryDto, ProxyUpdateDto } from '../dto';
import { ProxyService } from './proxy.service';

@UseGuards(AuthGuard('jwt'))
@Controller(':username')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @Post('/proxy')
  createProxy(@Body() dto: ProxyDto) {
    return this.proxyService.createProxy(dto);
  }

  @Patch('/proxy')
  updateProxy(@Body() dto: ProxyUpdateDto) {
    return this.proxyService.updateProxy(dto);
  }

  @Get('/proxies')
  getBulkProxies(@Body() dto: ProxyQueryDto) {
    return this.proxyService.getBulkProxies(dto.proxyIds);
  }

  @Delete('/proxies')
  deleteBulkProxies(@Body() dto: ProxyQueryDto) {
    return this.proxyService.deleteBulkProxies(dto.proxyIds);
  }
}
