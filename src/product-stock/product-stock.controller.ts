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
import { ProductStockService } from './product-stock.service';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('product-stock')
export class ProductStockController {
  constructor(private readonly productStockService: ProductStockService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Product stock created successfully.',
  })
  @ApiBody({ type: CreateProductStockDto })
  async create(@Body() createProductStockDto: CreateProductStockDto) {
    return await this.productStockService.create(createProductStockDto);
  }

  @Get()
  async findAll() {
    return await this.productStockService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productStockService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    return await this.productStockService.update(id, updateProductStockDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.productStockService.remove(id);
  }
}
