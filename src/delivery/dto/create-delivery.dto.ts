import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({ example: 'id' })
  id_saler: string;
  @ApiProperty({ example: '6501c130-00f4-4477-b7b6-c59fef39a60b' })
  id_deliveryman: string;
}
