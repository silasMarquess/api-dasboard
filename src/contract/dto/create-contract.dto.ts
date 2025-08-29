import { ApiProperty } from '@nestjs/swagger';

export class CreateContractDto {
  @ApiProperty({ example: '1edf80e8-fb2e-4ad8-bf00-2f15b36ce2ce' })
  id_client: string;

  @ApiProperty({ example: 'b8588da5-f509-4db5-8f00-a17133e2c0e8' })
  id_product: string;
  @ApiProperty({ example: 2 })
  quantity: number;

  @ApiProperty({ example: 0 })
  status: number;

  @ApiProperty({ example: 0 })
  condition: number;

  @ApiProperty({ example: new Date() })
  dateStart: Date;

  @ApiProperty({ example: new Date() })
  dateEnd: Date;
}
