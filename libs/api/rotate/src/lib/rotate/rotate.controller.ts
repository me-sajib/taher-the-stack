import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RotateService } from './rotate.service';

@UseGuards(AuthGuard('basic'))
@Controller('rotate')
export class RotateController {
  constructor(private rotateService: RotateService) {}

  @Get()
  rotateProxy(@Req() req: any) {
    return this.rotateService.rotateProxy(req.user.username);
  }
}
