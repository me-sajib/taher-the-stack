import { Body, Controller, Patch } from '@nestjs/common';
import { CheckService } from './check.service';
import { BodyDto } from './dto';

@Controller('proxy-list/check')
export class CheckController {
  constructor(private checkPorxyService: CheckService) {}

  @Patch()
  checkProxyList(@Body() body: BodyDto) {
    return this.checkPorxyService.checkProxyList(body);
  }
}
