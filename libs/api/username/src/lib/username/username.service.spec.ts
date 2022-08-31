import { Test, TestingModule } from '@nestjs/testing';
import { UsernameService } from './username.service';

describe('UsernameService', () => {
  let service: UsernameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsernameService],
    }).compile();

    service = module.get<UsernameService>(UsernameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
