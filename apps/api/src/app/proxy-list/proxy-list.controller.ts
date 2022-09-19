import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserDto } from '../user/dto';
import {
  ProxyListBulkDto,
  ProxyListDto,
  ProxyListParamDto,
  ProxyListUpdateDto,
} from './dto';
import { ProxyListService } from './proxy-list.service';

@UseGuards(AuthGuard('jwt'))
@Controller('proxy-list')
export class ProxyListController {
  constructor(private proxyListService: ProxyListService) {}

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

  @Get('/:username')
  getProxyList(@Param() param: ProxyListParamDto) {
    return this.proxyListService.getProxyList(param);
  }

  @Post('/new')
  createProxyList(@Body() dto: ProxyListDto, @Req() req: Request) {
    return this.proxyListService.createProxyList(
      dto,
      (req.user as UserDto).userId
    );
  }

  @Patch('/update')
  bulkUpdateProxyList(@Body() dto: ProxyListUpdateDto[]) {
    return this.proxyListService.bulkUpdateProxyList(dto);
  }

  @Delete('/delete')
  deleteBulkProxyLists(@Body() dto: ProxyListBulkDto, @Req() req: Request) {
    return this.proxyListService.deleteBulkProxyList(
      (req.user as UserDto).userId,
      dto.listKeys
    );
  }
}
