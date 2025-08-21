import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataProcessService } from 'src/data-process/data-process.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly dataProcessService: DataProcessService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploaderFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('File not found');
    try {
      const range = 'A1:B6';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const processedData: any = this.dataProcessService.processDataSheet(
        file.buffer,
        range,
      );
      console.log(processedData);
    } catch (erro) {
      console.log('erro ao processar planilha');
      throw new BadRequestException('Erro ao processar planilha');
    }
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
