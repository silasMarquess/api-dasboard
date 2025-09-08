import { PartialType } from '@nestjs/swagger';
import { CreateStockMovimentDto } from './create-stock-moviment.dto';

export class UpdateStockMovimentDto extends PartialType(
  CreateStockMovimentDto,
) {}
