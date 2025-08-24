import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Res,
} from '@nestjs/common';
import { SalerService } from './saler.service';
import { CreateSalerDto } from './dto/create-saler.dto';
import { ConverttoDatePipe } from './pipes/converrt-to-date-pipe';
import { ApiBody } from '@nestjs/swagger';
import express from 'express';

@Controller('saler')
export class SalerController {
  constructor(private readonly salerService: SalerService) {}

  @Post()
  @UsePipes(new ConverttoDatePipe())
  @ApiBody({ type: CreateSalerDto })
  create(
    @Body() createSalerDto: CreateSalerDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return res.status(201).json({
      saleCreated: this.salerService.create(createSalerDto),
    });
  }

  @Patch(':id')
  @UsePipes(new ConverttoDatePipe())
  @ApiBody({ type: CreateSalerDto })
  update(
    @Param('id') id: string,
    @Body() updateSalerDto: CreateSalerDto,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return res.status(200).json({
      saleUpdated: this.salerService.update(id, updateSalerDto),
    });
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return res.status(200).json({
      saleRemoved: this.salerService.remove(id),
    });
  }

  @Get()
  findAll(@Res({ passthrough: true }) res: express.Response) {
    return res.status(200).json({
      sales: this.salerService.findAll(),
    });
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: express.Response,
  ) {
    return res.status(200).json(this.salerService.findOne(id));
  }
}
