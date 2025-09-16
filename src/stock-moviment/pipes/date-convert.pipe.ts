import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateStockMovimentDto } from '../dto/create-stock-moviment.dto';

@Injectable()
export default class ConvertToDatePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateStockMovimentDto, metadata: ArgumentMetadata) {
    const { date, ...rest } = value;

    return {
      ...rest,
      date: new Date(date),
    };
  }
}
