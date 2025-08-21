import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WholeSalerService } from './whole-saler.service';
import { CreateWholeSalerDto } from './dto/create-whole-saler.dto';
import { UpdateWholeSalerDto } from './dto/update-whole-saler.dto';

@Controller('whole-saler')
export class WholeSalerController {
  constructor(private readonly wholeSalerService: WholeSalerService) {}

  @Post()
  create(@Body() createWholeSalerDto: CreateWholeSalerDto) {
    return this.wholeSalerService.create(createWholeSalerDto);
  }

  @Get()
  findAll() {
    return this.wholeSalerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wholeSalerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWholeSalerDto: UpdateWholeSalerDto) {
    return this.wholeSalerService.update(+id, updateWholeSalerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wholeSalerService.remove(+id);
  }
}
