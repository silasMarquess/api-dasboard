import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
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
  create(
    @Body(new ConvertToDatePipe()) createDeliveryManDto: CreateDeliveryManDto,
  ) {
    return this.deliveryManService.create(createDeliveryManDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Delivery men retrieved successfully',
  })
  findAll() {
    return this.deliveryManService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Delivery man retrieved successfully',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.deliveryManService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Delivery man updated successfully',
  })
  @ApiBody({ type: UpdateDeliveryManDto })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ConvertToDatePipe()) updateDeliveryManDto: UpdateDeliveryManDto,
  ) {
    return this.deliveryManService.update(id, updateDeliveryManDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Delivery man deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. ID is not a valid UUID.',
  })
  @ApiResponse({ status: 404, description: 'Delivery man not found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deliveryManService.remove(id);
  }
}
