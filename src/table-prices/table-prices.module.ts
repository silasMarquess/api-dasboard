import { Module } from '@nestjs/common';
import { TablePricesService } from './table-prices.service';
import { TablePricesController } from './table-prices.controller';

@Module({
  controllers: [TablePricesController],
  providers: [TablePricesService],
})
export class TablePricesModule {}
