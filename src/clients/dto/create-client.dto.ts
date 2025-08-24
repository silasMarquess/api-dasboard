import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({ example: 'Joao da Silva' })
  fullName: string;

  @ApiProperty({ example: 100 })
  stockGaz: number;

  @ApiProperty({ example: '878e7ad2-0e21-4db4-ab06-12c10376641b' })
  regionId: string;
}
