import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserDto } from '../user/dto';
import { ProxyDto, ProxyQueryDto, ProxyUpdateDto } from './dto';
import { ProxyService } from './proxy.service';

@UseGuards(AuthGuard('jwt'))
@Controller('proxies')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @Post()
  createProxy(@Body() dto: ProxyDto, @Req() req: Request) {
    return this.proxyService.createProxy((req.user as UserDto).userId, dto);
  }

  @Patch()
  updateBulkProxy(@Body() dto: ProxyUpdateDto[]) {
    return this.proxyService.updateBulkProxy(dto);
  }

  @Get()
  getBulkProxies(@Query() dto: ProxyQueryDto, @Req() req: Request) {
    return this.proxyService.getBulkProxies(
      (req.user as UserDto).userId,
      dto.proxyListKey,
      dto.proxyIds
    );
  }

  @Delete()
  deleteBulkProxies(@Body() dto: ProxyQueryDto, @Req() req: Request) {
    return this.proxyService.deleteBulkProxies(
      (req.user as UserDto).userId,
      dto.proxyListKey,
      dto.proxyIds
    );
  }
}
