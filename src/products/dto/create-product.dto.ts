import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Product description' })
  description: string;
  @ApiProperty({ example: 100 })
  staticStock: number;
}
