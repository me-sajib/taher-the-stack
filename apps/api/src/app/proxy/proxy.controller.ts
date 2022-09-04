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
import { ProxyDto, ProxyQueryDto, ProxyUpdateDto } from './dto';
import { ProxyService } from './proxy.service';

@UseGuards(AuthGuard('jwt'))
@Controller('proxies')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @Post()
  createProxy(@Body() dto: ProxyDto) {
    return this.proxyService.createProxy(dto);
  }

  @Patch()
  updateProxy(@Body() dto: ProxyUpdateDto) {
    return this.proxyService.updateProxy(dto);
  }

  @Get()
  getBulkProxies(@Body() dto: ProxyQueryDto) {
    return this.proxyService.getBulkProxies(dto.proxyListKey, dto.proxyIds);
  }

  @Delete()
  deleteBulkProxies(@Body() dto: ProxyQueryDto) {
    return this.proxyService.deleteBulkProxies(dto.proxyListKey, dto.proxyIds);
  }
}
