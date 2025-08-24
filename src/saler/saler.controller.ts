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
  async create(@Body() createSalerDto: CreateSalerDto) {
    return await this.salerService.create(createSalerDto);
  }

  @Patch(':id')
  @UsePipes(new ConverttoDatePipe())
  @ApiBody({ type: CreateSalerDto })
  @ApiResponse({ status: 200, description: 'Saler updated successfully' })
  async update(
    @Param('id') id: string,
    @Body() updateSalerDto: CreateSalerDto,
  ) {
    return await this.salerService.update(id, updateSalerDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Saler deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.salerService.remove(id);
  }

  @Get()
  async findAll() {
    return await this.salerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.salerService.findOne(id);
  }
}
