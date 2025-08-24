import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateDeliveryManDto } from '../dto/create-delivery-man.dto';

@Injectable()
export default class ConvertToDatePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateDeliveryManDto, metadata: ArgumentMetadata) {
    const { dateIn, birthDate, ...rest } = value;

    return {
      ...rest,
      dateIn: new Date(dateIn),
      birthDate: new Date(birthDate),
    };
  }
}
