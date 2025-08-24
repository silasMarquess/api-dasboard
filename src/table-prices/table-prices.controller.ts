import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TablePricesService } from './table-prices.service';
import { CreateTablePriceDto } from './dto/create-table-price.dto';
import { UpdateTablePriceDto } from './dto/update-table-price.dto';

@Controller('table-prices')
export class TablePricesController {
  constructor(private readonly tablePricesService: TablePricesService) {}

  @Post()
  create(@Body() createTablePriceDto: CreateTablePriceDto) {
    return this.tablePricesService.create(createTablePriceDto);
  }

  @Get()
  findAll() {
    return this.tablePricesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tablePricesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTablePriceDto: UpdateTablePriceDto) {
    return this.tablePricesService.update(+id, updateTablePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablePricesService.remove(+id);
  }
}
