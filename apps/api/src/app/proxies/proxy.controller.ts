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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from '../user/dto';
import {
  CheckBodyDto,
  ProxyCreateDto,
  ProxyQueryDto,
  ProxyUpdateDto,
} from './dto';
import { ProxyService } from './proxy.service';

@UseGuards(AuthGuard('jwt'))
@Controller('proxies')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @Get()
  @ApiOperation({
    tags: ['Proxy'],
    summary: 'The list of proxies you would like to peek',
    description:
      '__This endpoint will take all proxies from a specific proxy list if you provide empty array at__ `proxyIds`',
  })
  @ApiResponse({
    status: 200,
    description:
      'Return all proxies of proxy list. return [] array if not found any proxies',
  })
  getBulkProxies(@Query() dto: ProxyQueryDto, @Req() req: Request) {
    return this.proxyService.getBulkProxies(
      (req.user as UserDto).userId,
      dto.proxyListKey
    );
  }

  @Post('/new')
  @ApiOperation({
    tags: ['Proxy'],
    summary: 'To create a new proxy',
    description:
      '__This endpoint takes `ProxyCreateDto` schema in the request body and create a proxy under a specific proxy list, which proxy list key you provide in__ `proxyListKey`',
  })
  @ApiResponse({
    status: 201,
    description: 'It returns the created proxy',
  })
  createProxy(@Body() dto: ProxyCreateDto, @Req() req: Request) {
    return this.proxyService.createProxy((req.user as UserDto).userId, dto);
  }

  @Patch('/update')
  @ApiOperation({
    tags: ['Proxy'],
    summary: 'To update a proxy',
    description:
      '__This endpoint takes `ProxyUpdateDto` schema in the request body and update a proxy of a specific proxy list, which proxy list key you provide in__ `proxyListKey`',
  })
  @ApiResponse({
    status: 201,
    description: 'It returns the updated proxy',
  })
  updateBulkProxy(@Body() dto: ProxyUpdateDto[]) {
    return this.proxyService.updateBulkProxy(dto);
  }

  @Delete('/delete')
  @ApiOperation({
    tags: ['Proxy'],
    summary: 'To delete a proxy',
    description:
      "__This endpoint takes `ProxyQueryDto` schema in the request body and delete proxies of a specific proxy list, which proxy list key you provide in__ `proxyListKey`. __if you don't provide any proxy id in__ `proxyIds` __list it will delete all proxies of proxy list__",
  })
  @ApiResponse({
    status: 200,
    description: 'It shows a `Deleted proxy successfully` message',
  })
  deleteBulkProxies(@Query() dto: ProxyQueryDto, @Req() req: Request) {
    console.log({ dto });
    return this.proxyService.deleteBulkProxies(
      (req.user as UserDto).userId,
      dto.proxyListKey,
      dto.proxyIds
    );
  }

  @Patch('check')
  @ApiOperation({
    tags: ['Proxy'],
    summary: 'This endpoint can check the proxy status',
    description:
      'This endpoint will check passed list of proxy and return the proxy check status',
  })
  @ApiResponse({
    status: 200,
    description: 'This will return proxy map with status',
  })
  checkProxies(@Body() dto: CheckBodyDto) {
    return this.proxyService.checkProxies(dto);
  }
}
