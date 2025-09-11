import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { SaleDayAnalysisDTO } from './dto/sale.Analysis-dto';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { QueryParamsDTO } from './dto/query-dto';

@Injectable()
export class DataProcessService {
  constructor(private readonly httpService: HttpService) {}
  processDataSheet(buffer: Buffer, range: string): any {
    const bookeSheet = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = bookeSheet.SheetNames[0];
    const sheet = bookeSheet.Sheets[sheetName];
    const sheetDataInJson = xlsx.utils.sheet_to_json(sheet, { range });
    return sheetDataInJson;
  }

  async getAnalysicsData(query: QueryParamsDTO, sales: SaleDayAnalysisDTO[]) {
    const api_url =
      process.env.LEARNING_API_URL +
      `/sales/future/?periods=${query?.periods}&freq=${query?.freq}`;

    const response = await firstValueFrom(
      this.httpService.post(api_url, { sales: sales }).pipe(
        catchError((error: AxiosError) => {
          console.error(
            'Erro na requisição para a FastAPI:',
            error.response?.data,
          );
          throw new HttpException(
            'Erro ao buscar dados de análise',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }),
      ),
    );
    return response;
  }
}
