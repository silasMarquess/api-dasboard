import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateSalerDto } from '../dto/create-saler.dto';

export class ConverttoDatePipe implements PipeTransform {
  transform(value: CreateSalerDto, metadata: ArgumentMetadata) {
    if (value.date) {
      value.date = new Date(value.date);
    }

    return value;
  }
}
