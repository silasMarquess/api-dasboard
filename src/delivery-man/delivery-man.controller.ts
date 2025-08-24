import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
} from '@nestjs/common';
import { DeliveryManService } from './delivery-man.service';
import { CreateDeliveryManDto } from './dto/create-delivery-man.dto';
import { UpdateDeliveryManDto } from './dto/update-delivery-man.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

import ConvertToDatePipe from './pipes/convert-to-date-pipe';

@Controller('delivery-man')
export class DeliveryManController {
  constructor(private readonly deliveryManService: DeliveryManService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Delivery man created successfully',
  })
  @ApiBody({ type: CreateDeliveryManDto })
  @UsePipes(new ConvertToDatePipe())
  async create(@Body() createDeliveryManDto: CreateDeliveryManDto) {
    return await this.deliveryManService.create(createDeliveryManDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Delivery men retrieved successfully',
  })
  async findAll() {
    return await this.deliveryManService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Delivery man retrieved successfully',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deliveryManService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Delivery man updated successfully',
  })
  @ApiBody({ type: UpdateDeliveryManDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDeliveryManDto: UpdateDeliveryManDto,
  ) {
    return await this.deliveryManService.update(id, updateDeliveryManDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.deliveryManService.remove(id);
  }
}
