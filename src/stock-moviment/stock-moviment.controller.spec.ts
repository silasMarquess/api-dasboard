import { Test, TestingModule } from '@nestjs/testing';
import { StockMovimentController } from './stock-moviment.controller';
import { StockMovimentService } from './stock-moviment.service';

describe('StockMovimentController', () => {
  let controller: StockMovimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockMovimentController],
      providers: [StockMovimentService],
    }).compile();

    controller = module.get<StockMovimentController>(StockMovimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
