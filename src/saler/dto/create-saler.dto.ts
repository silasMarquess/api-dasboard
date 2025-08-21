import { ApiProperty } from '@nestjs/swagger';

export class CreateSalerDto {
  @ApiProperty({ example: 'Botijão de Gás' })
  productName: string;

  @ApiProperty({ example: Date.now() })
  date: Date;

  @ApiProperty({ example: 10 })
  quantity: number;

  @ApiProperty({ example: 1000 })
  productPriceInCents: number;
}
