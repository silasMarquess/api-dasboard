import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SalerService } from './saler.service';
import { CreateSalerDto } from './dto/create-saler.dto';
import { ConverttoDatePipe } from './pipes/converrt-to-date-pipe';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('saler')
export class SalerController {
  constructor(private readonly salerService: SalerService) {}

  @Post()
  @UsePipes(new ConverttoDatePipe())
  @ApiBody({ type: CreateSalerDto })
  @ApiResponse({ status: 201, description: 'Saler created successfully' })
  create(@Body() createSalerDto: CreateSalerDto) {
    return this.salerService.create(createSalerDto);
  }

  @Patch(':id')
  @UsePipes(new ConverttoDatePipe())
  @ApiBody({ type: CreateSalerDto })
  @ApiResponse({ status: 200, description: 'Saler updated successfully' })
  update(@Param('id') id: string, @Body() updateSalerDto: CreateSalerDto) {
    return this.salerService.update(id, updateSalerDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Saler deleted successfully' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.salerService.remove(id);
  }

  @Get()
  findAll() {
    return this.salerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.salerService.findOne(id);
  }
}
