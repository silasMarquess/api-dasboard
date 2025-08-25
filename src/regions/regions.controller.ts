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
import express from 'express';
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
  async create(@Body() createRegionDto: CreateRegionDto) {
    return {
      regionCreated: await this.regionsService.create(createRegionDto),
    };
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Regions retrieved successfully',
  })
  async findAll() {
    return await this.regionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Region retrieved successfully',
  })
  async findOne(@Param('id') id: string, @Res() res: express.Response) {
    return res.status(200).json({
      region: await this.regionsService.findOne(id),
    });
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Region updated successfully',
  })
  @ApiBody({ type: UpdateRegionDto })
  async update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
    @Res() res: express.Response,
  ) {
    return res.status(200).json({
      regionUpdated: await this.regionsService.update(id, updateRegionDto),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: express.Response) {
    return res.status(200).json({
      regionRemoved: await this.regionsService.remove(id),
    });
  }
}
