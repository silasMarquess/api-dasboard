import { Test, TestingModule } from '@nestjs/testing';
import { StockDayService } from './stock-day.service';

describe('StockDayService', () => {
  let service: StockDayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockDayService],
    }).compile();

    service = module.get<StockDayService>(StockDayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
