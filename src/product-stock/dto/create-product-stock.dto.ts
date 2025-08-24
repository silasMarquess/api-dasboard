import { ApiProperty } from '@nestjs/swagger';

export class CreateProductStockDto {
  @ApiProperty({ description: 'The description of the product stock' })
  description: string;

  @ApiProperty({ description: 'The stock quantity of the product' })
  stock: number;

  @ApiProperty({ description: 'The ID of the associated product' })
  id_product: string;
}
