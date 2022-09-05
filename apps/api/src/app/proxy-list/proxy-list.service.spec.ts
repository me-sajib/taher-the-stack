import { Test, TestingModule } from '@nestjs/testing';
import { ProxyListService } from './proxy-list.service';

describe('ProxyListService', () => {
  let service: ProxyListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProxyListService],
    }).compile();

    service = module.get<ProxyListService>(ProxyListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
