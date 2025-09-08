import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDayDto {
  @ApiProperty({ example: 1000 })
  startStock: number;

  @ApiProperty({ example: new Date() })
  date: Date;

  @ApiProperty({ example: 'e9cb75e5-1d33-4456-940d-59573f0ea87b' })
  id_product: string;

  @ApiProperty({ example: 1 })
  status: number;
}
