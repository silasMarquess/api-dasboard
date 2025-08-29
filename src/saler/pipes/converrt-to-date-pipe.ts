import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CreateSalerDto } from '../dto/create-saler.dto';

export class ConverttoDatePipe implements PipeTransform {
  transform(value: CreateSalerDto, metadata: ArgumentMetadata) {
    value.date = new Date(value.date);
    return value;
  }
}
