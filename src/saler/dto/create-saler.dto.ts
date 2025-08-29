import { ApiProperty } from '@nestjs/swagger';

export class CreateSalerDto {
  @ApiProperty({ example: '1' })
  paymentType: number;

  @ApiProperty({ example: '2025-12-23T10:00:00Z' })
  date: Date;

  @ApiProperty({ example: 12000 })
  valuePaidInCents: number;

  @ApiProperty({ example: 0 })
  discountInCents: number;

  @ApiProperty({ example: 3 })
  quantity: number;

  @ApiProperty({ example: 'd483ea6c-4a1e-4fdb-b2fa-b0a360fb6cd5' })
  id_tableprice: string;

  @ApiProperty({ example: '1edf80e8-fb2e-4ad8-bf00-2f15b36ce2ce' })
  id_client: string;

  @ApiProperty({ example: 0 })
  status: number;
}
