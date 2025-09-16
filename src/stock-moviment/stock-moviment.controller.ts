import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StockMovimentService } from './stock-moviment.service';
import { CreateStockMovimentDto } from './dto/create-stock-moviment.dto';
import { UpdateStockMovimentDto } from './dto/update-stock-moviment.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import ConvertToDatePipe from './pipes/date-convert.pipe';

@Controller('stock-moviment')
export class StockMovimentController {
  constructor(private readonly stockMovimentService: StockMovimentService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({ type: CreateStockMovimentDto })
  create(
    @Body(new ConvertToDatePipe())
    createStockMovimentDto: CreateStockMovimentDto,
  ) {
    return this.stockMovimentService.create(createStockMovimentDto);
  }

  @Get()
  @ApiQuery({
    name: 'id_stockDay',
    required: false,
    type: String,
  })
  findAll(@Query('id_stockDay') id_stockDay?: string) {
    return this.stockMovimentService.findAll({ id_stockDay });
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
