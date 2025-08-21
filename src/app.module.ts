import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalerModule } from './saler/saler.module';
import { UploadModule } from './upload/upload.module';
import { DataProcessModule } from './data-process/data-process.module';

@Module({
  imports: [SalerModule, UploadModule, DataProcessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
