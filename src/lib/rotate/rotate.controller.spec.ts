import { Test, TestingModule } from '@nestjs/testing';
import { RotateController } from './rotate.controller';

describe('RotateController', () => {
  let controller: RotateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RotateController],
    }).compile();

    controller = module.get<RotateController>(RotateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
