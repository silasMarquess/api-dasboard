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
import { StockDayService } from './stock-day.service';
import { CreateStockDayDto } from './dto/create-stock-day.dto';
import { UpdateStockDayDto } from './dto/update-stock-day.dto';
import { ConverttoDatePipe } from './pipes/converrt-to-date-pipe';
import { ApiQuery } from '@nestjs/swagger';

@Controller('stock-day')
export class StockDayController {
  constructor(private readonly stockDayService: StockDayService) {}

  @Post()
  create(@Body(new ConverttoDatePipe()) createStockDayDto: CreateStockDayDto) {
    return this.stockDayService.create(createStockDayDto);
  }

  @Get()
  @ApiQuery({
    name: 'productId',
    required: false,
    type: String,
  })
  findAll(@Query('productId') productId?: string) {
    return this.stockDayService.findAll({ productId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockDayService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockDayDto: UpdateStockDayDto,
  ) {
    return this.stockDayService.update(id, updateStockDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockDayService.remove(id);
  }
}
