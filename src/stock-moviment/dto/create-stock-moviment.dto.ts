import { ApiProperty } from '@nestjs/swagger';

export class CreateStockMovimentDto {
  @ApiProperty({ example: 1000 })
  quantity: number;

  @ApiProperty({ example: 0 })
  date: Date;

  @ApiProperty({ example: 1 })
  type: number;

  @ApiProperty({ example: 1 })
  typeMov: number;

  @ApiProperty({ example: '44ba7681-2438-4f5c-ad40-50183d9e319e' })
  id_stockProduct: string;

  @ApiProperty({ example: '9849fe1d-755d-40ad-aa80-73a9698013bd' })
  id_stockDay: string;

  @ApiProperty({ example: '5b3ce0ca-af46-4650-9c0c-04a218677540' })
  id_contract: string;
}
