import { Test, TestingModule } from '@nestjs/testing';
import { StockDayController } from './stock-day.controller';
import { StockDayService } from './stock-day.service';

describe('StockDayController', () => {
  let controller: StockDayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockDayController],
      providers: [StockDayService],
    }).compile();

    controller = module.get<StockDayController>(StockDayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
