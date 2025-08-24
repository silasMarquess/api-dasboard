import { ApiProperty } from '@nestjs/swagger';

export class CreateSalerDto {
  @ApiProperty({ example: '1' })
  paymentType: number;

  @ApiProperty({ example: Date.now() })
  date: Date;

  @ApiProperty({ example: 1000 })
  valuePaidInCents: number;

  @ApiProperty({ example: '1dwq14wqrsf1412' })
  discountInCents: number;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({ example: '1dwq14wqrsf1412' })
  id_priceTable: string;

  @ApiProperty({ example: '1dwq14wqrsf1412' })
  id_client: string;

  @ApiProperty({ example: '1dwq14wqrsf1412' })
  id_DeliveryMan?: string;
}
