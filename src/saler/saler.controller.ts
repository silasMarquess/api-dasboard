import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { SalerService } from './saler.service';
import { CreateSalerDto } from './dto/create-saler.dto';
import { UpdateSalerDto } from './dto/update-saler.dto';
import { ConverttoDatePipe } from './pipes/converrt-to-date-pipe';

@Controller('saler')
export class SalerController {
  constructor(private readonly salerService: SalerService) {}

  @Post()
  @UsePipes(new ConverttoDatePipe())
  create(@Body() createSalerDto: CreateSalerDto) {
    return this.salerService.create(createSalerDto);
  }

  @Get()
  findAll() {
    return this.salerService.findAll();
  }
}
