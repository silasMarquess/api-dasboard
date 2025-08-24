import { Test, TestingModule } from '@nestjs/testing';
import { TablePricesService } from './table-prices.service';

describe('TablePricesService', () => {
  let service: TablePricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablePricesService],
    }).compile();

    service = module.get<TablePricesService>(TablePricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
