import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Region created successfully',
  })
  @ApiBody({ type: CreateRegionDto })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Regions retrieved successfully',
  })
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Region retrieved successfully',
  })
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Region updated successfully',
  })
  @ApiBody({ type: UpdateRegionDto })
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(id, updateRegionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(id);
  }
}
