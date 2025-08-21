import { Controller } from '@nestjs/common';
import { DataProcessService } from './data-process.service';

@Controller('data-process')
export class DataProcessController {
  constructor(private readonly dataProcessService: DataProcessService) {}
}
