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
  Query,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import ConvertToDatePipe, {
  ConvertToDateUpdateContractPipe,
} from './pipes/convert-to-date-pipe';
import { Filters } from './dto/filter-params-dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({ type: CreateContractDto })
  async create(
    @Body(new ConvertToDatePipe()) createContractDto: CreateContractDto,
  ) {
    return await this.contractService.create(createContractDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'dateStart',
    required: false,
    type: Date,
  })
  @ApiQuery({
    name: 'dateEnd',
    required: false,
    type: Date,
  })
  async findAll(@Query() filters?: Filters) {
    return await this.contractService.findAll(filters || {});
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.contractService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiBody({ type: UpdateContractDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ConvertToDateUpdateContractPipe())
    updateContractDto: UpdateContractDto,
  ) {
    return await this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  async remove(@Param('id') id: string) {
    return await this.contractService.remove(id);
  }
}
