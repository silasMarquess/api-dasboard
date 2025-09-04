import { ApiProperty } from '@nestjs/swagger';

export class CreateTablePriceDto {
  @ApiProperty({ example: 'Table Price Description' })
  description: string;

  @ApiProperty({ example: 1000 })
  priceInCents: number;

  @ApiProperty({ example: 'b8588da5-f509-4db5-8f00-a17133e2c0e8' })
  id_products: string;

  @ApiProperty({ example: '2025-09-04T17:09:12.130Z' })
  updateAt: Date;
}
