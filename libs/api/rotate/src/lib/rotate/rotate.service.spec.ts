import { Test, TestingModule } from '@nestjs/testing';
import { RotateService } from './rotate.service';

describe('RotateService', () => {
  let service: RotateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RotateService],
    }).compile();

    service = module.get<RotateService>(RotateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
