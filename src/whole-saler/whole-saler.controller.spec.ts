import { Test, TestingModule } from '@nestjs/testing';
import { WholeSalerController } from './whole-saler.controller';
import { WholeSalerService } from './whole-saler.service';

describe('WholeSalerController', () => {
  let controller: WholeSalerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WholeSalerController],
      providers: [WholeSalerService],
    }).compile();

    controller = module.get<WholeSalerController>(WholeSalerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
