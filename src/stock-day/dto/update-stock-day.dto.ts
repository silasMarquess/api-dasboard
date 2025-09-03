import { PartialType } from '@nestjs/swagger';
import { CreateStockDayDto } from './create-stock-day.dto';

export class UpdateStockDayDto extends PartialType(CreateStockDayDto) {}
