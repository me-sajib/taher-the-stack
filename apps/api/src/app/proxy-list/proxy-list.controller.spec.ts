import { Test, TestingModule } from '@nestjs/testing';
import { ProxyListController } from './proxy-list.controller';

describe('ProxyListController', () => {
  let controller: ProxyListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProxyListController],
    }).compile();

    controller = module.get<ProxyListController>(ProxyListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
