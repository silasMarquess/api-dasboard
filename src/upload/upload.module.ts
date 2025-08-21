import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { DataProcessModule } from 'src/data-process/data-process.module';

@Module({
  imports: [DataProcessModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
