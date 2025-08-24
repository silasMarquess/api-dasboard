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
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Client created successfully.' })
  @ApiBody({ type: CreateClientDto })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Clients retrieved successfully.' })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Client retrieved successfully.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Client updated successfully.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Client removed successfully.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.clientsService.remove(id);
  }
}
