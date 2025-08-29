import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalerModule } from './saler/saler.module';
import { UploadModule } from './upload/upload.module';
import { DataProcessModule } from './data-process/data-process.module';
import { DeliveryManModule } from './delivery-man/delivery-man.module';

import { RegionsModule } from './regions/regions.module';
import { ClientsModule } from './clients/clients.module';
import { ProductsModule } from './products/products.module';
import { ProductStockModule } from './product-stock/product-stock.module';
import { TablePricesModule } from './table-prices/table-prices.module';
import { DeliveryModule } from './delivery/delivery.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [
    SalerModule,
    UploadModule,
    DataProcessModule,
    DeliveryManModule,
    RegionsModule,
    ClientsModule,
    ProductsModule,
    ProductStockModule,
    TablePricesModule,
    DeliveryModule,
    ContractModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
