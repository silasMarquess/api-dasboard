import { Body, Controller, Post, Query } from '@nestjs/common';
import { DataProcessService } from './data-process.service';
import { SaleDayAnalysisDTO } from './dto/sale.Analysis-dto';
import { QueryParamsDTO } from './dto/query-dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('data-process')
export class DataProcessController {
  constructor(private readonly dataProcessService: DataProcessService) {}

  @Post('/analysis')
  @ApiBody({ type: SaleDayAnalysisDTO, isArray: true })
  @ApiQuery({
    name: 'periods',
    required: true,
    description: 'Número de períodos para a previsão.',
    example: 12,
  })
  @ApiQuery({
    name: 'freq',
    required: true,
    description: 'Frequência dos dados (ex: "D" para diário, "M" para mensal).',
    example: 'D',
  })
  @ApiResponse({ status: 201, description: 'Análise retornada com sucesso.' })
  async getAnalytics(
    @Query() query: QueryParamsDTO,
    @Body() sales: SaleDayAnalysisDTO[],
  ) {
    const response = await this.dataProcessService.getAnalysicsData(
      query,
      sales,
    );
    console.log(response);
  }
}
