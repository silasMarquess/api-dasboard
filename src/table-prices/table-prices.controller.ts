import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TablePricesService } from './table-prices.service';
import { CreateTablePriceDto } from './dto/create-table-price.dto';
import { UpdateTablePriceDto } from './dto/update-table-price.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('table-prices')
export class TablePricesController {
  constructor(private readonly tablePricesService: TablePricesService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Table price created successfully.',
  })
  @ApiBody({ type: CreateTablePriceDto })
  async create(@Body() createTablePriceDto: CreateTablePriceDto) {
    return await this.tablePricesService.create(createTablePriceDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Table prices retrieved successfully.',
  })
  async findAll() {
    return await this.tablePricesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Table price retrieved successfully.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.tablePricesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Table price updated successfully.',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTablePriceDto: UpdateTablePriceDto,
  ) {
    return await this.tablePricesService.update(id, updateTablePriceDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.tablePricesService.remove(id);
  }
}
