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
import { ProxyListBulkDto, ProxyListDto, ProxyListUpdateDto } from './dto';
import { ProxyListService } from './proxy-list.service';

@UseGuards(AuthGuard('jwt'))
@Controller('proxy-list')
export class ProxyListController {
  constructor(private proxyListService: ProxyListService) {}

  @Post()
  createProxyList(@Body() dto: ProxyListDto) {
    return this.proxyListService.createProxyList(dto);
  }

  @Get()
  getBulkProxyLists(
    @Body() dto: ProxyListBulkDto,
    @Req() req: Request,
    @Query('include_proxies') includeProxies: boolean
  ) {
    return this.proxyListService.getBulkProxyLists(
      (req.user as UserDto).userId,
      dto.listKeys,
      includeProxies
    );
  }

  @Delete()
  deleteBulkProxyLists(@Body() dto: ProxyListBulkDto, @Req() req: Request) {
    return this.proxyListService.deleteBulkProxyList(
      (req.user as UserDto).userId,
      dto.listKeys
    );
  }

  @Patch()
  updateProxyList(@Body() dto: ProxyListUpdateDto[]) {
    return this.proxyListService.updateProxyList(dto);
  }
}
