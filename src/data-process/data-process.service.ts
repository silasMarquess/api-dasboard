import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';

@Injectable()
export class DataProcessService {
  processDataSheet(buffer: Buffer, range: string): any {
    const bookeSheet = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = bookeSheet.SheetNames[0];
    const sheet = bookeSheet.Sheets[sheetName];
    const sheetDataInJson = xlsx.utils.sheet_to_json(sheet, { range });
    return sheetDataInJson;
  }
}
