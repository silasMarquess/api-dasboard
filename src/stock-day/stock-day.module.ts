import { Module } from '@nestjs/common';
import { StockDayService } from './stock-day.service';
import { StockDayController } from './stock-day.controller';

@Module({
  controllers: [StockDayController],
  providers: [StockDayService],
})
export class StockDayModule {}
