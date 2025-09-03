import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateContractDto } from '../dto/create-contract.dto';

@Injectable()
export default class ConvertToDatePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateContractDto, metadata: ArgumentMetadata) {
    const { dateStart, ...rest } = value;

    return {
      ...rest,
      dateStart: new Date(dateStart),
    };
  }
}
