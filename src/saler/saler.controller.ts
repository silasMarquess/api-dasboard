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
import { SalerService } from './saler.service';
import { CreateSalerDto } from './dto/create-saler.dto';
import { ConverttoDatePipe } from './pipes/converrt-to-date-pipe';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UpdateSalerDto } from './dto/update-saler.dto';

@Controller('saler')
export class SalerController {
  constructor(private readonly salerService: SalerService) {}

  @Post()
  @ApiBody({ type: CreateSalerDto })
  @ApiResponse({ status: 201, description: 'Saler created successfully' })
  create(@Body(new ConverttoDatePipe()) createSalerDto: CreateSalerDto) {
    return this.salerService.create(createSalerDto);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateSalerDto })
  @ApiResponse({ status: 200, description: 'Saler updated successfully' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ConverttoDatePipe()) updateSalerDto: UpdateSalerDto,
  ) {
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
