import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalerModule } from './saler/saler.module';
import { UploadModule } from './upload/upload.module';
import { DataProcessModule } from './data-process/data-process.module';
import { DeliveryManModule } from './delivery-man/delivery-man.module';
import { WholeSalerModule } from './whole-saler/whole-saler.module';
import { RegionsModule } from './regions/regions.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [SalerModule, UploadModule, DataProcessModule, DeliveryManModule, WholeSalerModule, RegionsModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
