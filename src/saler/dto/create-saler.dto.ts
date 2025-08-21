import { ApiProperty } from '@nestjs/swagger';

export class CreateSalerDto {
  @ApiProperty({ example: '1' })
  productId: number;

  @ApiProperty({ example: Date.now() })
  date: Date;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({ example: 1000 })
  productPriceInCents: number;

  @ApiProperty({ example: '1dwq14wqrsf1412' })
  idDeliveryMan: string;

  @ApiProperty({ example: '1dwq14wqrsf1412' })
  id_wholeSaler?: string;
}
