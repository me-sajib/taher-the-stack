import { Test, TestingModule } from '@nestjs/testing';
import { UsernameController } from './username.controller';

describe('UsernameController', () => {
  let controller: UsernameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsernameController],
    }).compile();

    controller = module.get<UsernameController>(UsernameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
