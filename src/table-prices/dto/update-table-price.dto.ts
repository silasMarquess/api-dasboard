import { PartialType } from '@nestjs/swagger';
import { CreateTablePriceDto } from './create-table-price.dto';

export class UpdateTablePriceDto extends PartialType(CreateTablePriceDto) {}
