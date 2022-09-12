import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckProxyService } from './check-proxy.service';
import { BodyDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('check-proxy')
export class CheckProxyController {
  constructor(private checkProxyService: CheckProxyService) {}

  @Post()
  checkProxies(@Body() dto: BodyDto) {
    return this.checkProxyService.checkProxies(dto);
  }
}
