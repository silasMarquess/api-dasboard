import { Test, TestingModule } from '@nestjs/testing';
import { TablePricesController } from './table-prices.controller';
import { TablePricesService } from './table-prices.service';

describe('TablePricesController', () => {
  let controller: TablePricesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablePricesController],
      providers: [TablePricesService],
    }).compile();

    controller = module.get<TablePricesController>(TablePricesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
