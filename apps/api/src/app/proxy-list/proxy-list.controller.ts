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
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDto } from '../user/dto';
import {
  ProxyListBodyBulkDto,
  ProxyListBodyDto,
  ProxyListParamDto,
  ProxyListUpdateDto,
} from './dto';
import { ProxyListService } from './proxy-list.service';

@UseGuards(AuthGuard('jwt'))
@Controller('proxy-list')
export class ProxyListController {
  constructor(private proxyListService: ProxyListService) {}

  @Get()
  @ApiOperation({
    tags: ['Proxy list'],
    summary: 'The list of proxy-list you would like to peek',
    description:
      '__This endpoint will return all proxy-list if you provide an empty array at__ `listKeys` __else will return the specific proxy-list whatever you passed the keys__',
  })
  @ApiQuery({
    name: 'include_proxies',
    type: Boolean,
    required: false,
    description:
      'If you would like to take proxies as well then change the value to `true`',
  })
  @ApiResponse({
    status: 200,
    description:
      'It returns all proxy-list. return `[]` array if not found any proxies',
  })
  getBulkProxyLists(
    @Body() dto: ProxyListBodyBulkDto,
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
  @ApiOperation({
    tags: ['Proxy list'],
    summary: 'The proxy-list based on `:username:` param',
    description:
      '__This endpoint will return a proxy-list based on parameter__',
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'The username of a specific proxy-list',
  })
  @ApiResponse({
    status: 200,
    description: 'It returns all proxy-list',
  })
  getProxyList(@Param() param: ProxyListParamDto) {
    return this.proxyListService.getProxyList(param);
  }

  @Post('/new')
  @ApiOperation({
    tags: ['Proxy list'],
    summary: 'Create a proxy list',
    description:
      '__This endpoint create a proxy-list based on the body dto `ProxyListBodyDto` schema & return the created proxy list. if the proxy list username already exist it return unique error__',
  })
  @ApiResponse({
    status: 200,
    description: 'It return the created proxy-list',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request error when the username already exist in the database',
  })
  createProxyList(@Body() dto: ProxyListBodyDto, @Req() req: Request) {
    return this.proxyListService.createProxyList(
      dto,
      (req.user as UserDto).userId
    );
  }

  @Patch('/update')
  @ApiOperation({
    tags: ['Proxy list'],
    summary: 'The list of proxy-list that will be updated',
    description:
      '__This endpoint take a list proxy proxy-list update dto & update each proxy-list one by one, afterward it returns all updated proxy-list which are provided into the body dto.__',
  })
  @ApiResponse({
    status: 200,
    description: 'It will return all updated proxy-list if all process are OK',
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad request error when the username already exist in the database',
  })
  bulkUpdateProxyList(@Body() dto: ProxyListUpdateDto[]) {
    return this.proxyListService.bulkUpdateProxyList(dto);
  }

  @Delete('/delete')
  @ApiOperation({
    tags: ['Proxy list'],
    summary:
      'The list of proxy-list you would like to delete (It slightly like bulk get)',
    description:
      '__This endpoint will delete all proxy-list if you provide an empty array at__ `listKeys` __else will delete the specific proxy-list whatever you passed the keys__',
  })
  @ApiResponse({
    status: 200,
    description:
      'It will show the `Deleted proxy list successfully` message if the all process are ok',
  })
  deleteBulkProxyLists(@Body() dto: ProxyListBodyBulkDto, @Req() req: Request) {
    return this.proxyListService.deleteBulkProxyList(
      (req.user as UserDto).userId,
      dto.listKeys
    );
  }
}
