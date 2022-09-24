import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CheckService } from './check.service';
import { BodyDto } from './dto';

@UseGuards(AuthGuard('jwt'))
@Controller('proxies/check')
export class CheckController {
  constructor(private checkService: CheckService) {}

  @Patch()
  checkProxies(@Body() dto: BodyDto) {
    return this.checkService.checkProxies(dto);
  }
}
