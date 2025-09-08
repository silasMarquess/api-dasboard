import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateStockDayDto } from '../dto/create-stock-day.dto';

export class ConverttoDatePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateStockDayDto, metadata: ArgumentMetadata) {
    value.date = new Date(value.date);
    return value;
  }
}
