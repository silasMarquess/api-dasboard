import { Module } from '@nestjs/common';
import { DataProcessService } from './data-process.service';
import { DataProcessController } from './data-process.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DataProcessController],
  providers: [DataProcessService],
  exports: [DataProcessService],
})
export class DataProcessModule {}
