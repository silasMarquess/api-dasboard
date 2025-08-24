import { ApiProperty } from '@nestjs/swagger';

export class CreateTablePriceDto {
  @ApiProperty({ example: 'Table Price Description' })
  description: string;

  @ApiProperty({ example: 1000 })
  priceInCents: number;

  @ApiProperty({ example: 'b8588da5-f509-4db5-8f00-a17133e2c0e8' })
  id_products: string;
}
