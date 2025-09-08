import { Test, TestingModule } from '@nestjs/testing';
import { StockMovimentService } from './stock-moviment.service';

describe('StockMovimentService', () => {
  let service: StockMovimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockMovimentService],
    }).compile();

    service = module.get<StockMovimentService>(StockMovimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
