import { Test, TestingModule } from '@nestjs/testing';
import { CheckProxyController } from './check-proxy.controller';

describe('CheckProxyController', () => {
  let controller: CheckProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckProxyController],
    }).compile();

    controller = module.get<CheckProxyController>(CheckProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
