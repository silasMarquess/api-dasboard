import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';

@Injectable()
export default class ConvertToDatePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: CreateContractDto, metadata: ArgumentMetadata) {
    const { dateStart, dateEnd, ...rest } = value;
    return {
      ...rest,
      dateStart: new Date(dateStart),
      dateEnd: new Date(dateEnd),
    };
  }
}

export class ConvertToDateUpdateContractPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: UpdateContractDto, metadata: ArgumentMetadata) {
    const { dateEnd, status, ...rest } = value;

    return {
      ...rest,
      status,
      dateEnd: new Date(dateEnd || ''),
    };
  }
}
