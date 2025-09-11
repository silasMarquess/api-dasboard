import { ApiProperty } from '@nestjs/swagger';

export class SaleDayAnalysisDTO {
  @ApiProperty({ example: new Date().toISOString() })
  ds: Date;
  @ApiProperty({ example: 3450 })
  y: number;
}
