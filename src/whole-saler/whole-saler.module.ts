import { Module } from '@nestjs/common';
import { WholeSalerService } from './whole-saler.service';
import { WholeSalerController } from './whole-saler.controller';

@Module({
  controllers: [WholeSalerController],
  providers: [WholeSalerService],
})
export class WholeSalerModule {}
