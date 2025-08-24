import { ApiProperty } from '@nestjs/swagger';

export class CreateRegionDto {
  @ApiProperty({ example: 'Cumaru/Senador La Rocque' })
  description: string;
}
