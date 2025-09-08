import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockMovimentService } from './stock-moviment.service';
import { CreateStockMovimentDto } from './dto/create-stock-moviment.dto';
import { UpdateStockMovimentDto } from './dto/update-stock-moviment.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('stock-moviment')
export class StockMovimentController {
  constructor(private readonly stockMovimentService: StockMovimentService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({ type: CreateStockMovimentDto })
  create(@Body() createStockMovimentDto: CreateStockMovimentDto) {
    return this.stockMovimentService.create(createStockMovimentDto);
  }

  @Get()
  findAll() {
    return this.stockMovimentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockMovimentService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateStockMovimentDto })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  update(
    @Param('id') id: string,
    @Body() updateStockMovimentDto: UpdateStockMovimentDto,
  ) {
    return this.stockMovimentService.update(id, updateStockMovimentDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiBody({ type: UpdateStockMovimentDto })
  remove(@Param('id') id: string) {
    return this.stockMovimentService.remove(id);
  }
}
