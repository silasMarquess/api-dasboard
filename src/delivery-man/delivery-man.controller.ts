import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeliveryManService } from './delivery-man.service';
import { CreateDeliveryManDto } from './dto/create-delivery-man.dto';
import { UpdateDeliveryManDto } from './dto/update-delivery-man.dto';

@Controller('delivery-man')
export class DeliveryManController {
  constructor(private readonly deliveryManService: DeliveryManService) {}

  @Post()
  create(@Body() createDeliveryManDto: CreateDeliveryManDto) {
    return this.deliveryManService.create(createDeliveryManDto);
  }

  @Get()
  findAll() {
    return this.deliveryManService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryManService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryManDto: UpdateDeliveryManDto) {
    return this.deliveryManService.update(+id, updateDeliveryManDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryManService.remove(+id);
  }
}
