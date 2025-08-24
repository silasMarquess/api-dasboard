import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryManDto {
  @ApiProperty({ example: 'Joao do gás' })
  fullName: string;
  @ApiProperty({ example: '2018-08-12T00:00:00.000Z' })
  dateIn: Date;
  @ApiProperty({ example: '2020-08-12T00:00:00.000Z' })
  birthDate: Date;
}
