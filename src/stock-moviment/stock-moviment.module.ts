import { Module } from '@nestjs/common';
import { StockMovimentService } from './stock-moviment.service';
import { StockMovimentController } from './stock-moviment.controller';

@Module({
  controllers: [StockMovimentController],
  providers: [StockMovimentService],
})
export class StockMovimentModule {}
