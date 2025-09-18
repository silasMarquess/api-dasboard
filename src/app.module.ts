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
import { AuthModule } from './auth/auth.module';
import { StockDayModule } from './stock-day/stock-day.module';
import { UsersModule } from './users/users.module';
import { StockMovimentModule } from './stock-moviment/stock-moviment.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
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
    AuthModule,
    StockDayModule,
    UsersModule,
    StockMovimentModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
