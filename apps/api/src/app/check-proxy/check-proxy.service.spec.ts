import { Test, TestingModule } from '@nestjs/testing';
import { CheckProxyService } from './check-proxy.service';

describe('CheckProxyService', () => {
  let service: CheckProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckProxyService],
    }).compile();

    service = module.get<CheckProxyService>(CheckProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
