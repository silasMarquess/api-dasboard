import { Injectable } from '@nestjs/common';
import { CreateTablePriceDto } from './dto/create-table-price.dto';
import { UpdateTablePriceDto } from './dto/update-table-price.dto';

@Injectable()
export class TablePricesService {
  create(createTablePriceDto: CreateTablePriceDto) {
    return 'This action adds a new tablePrice';
  }

  findAll() {
    return `This action returns all tablePrices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tablePrice`;
  }

  update(id: number, updateTablePriceDto: UpdateTablePriceDto) {
    return `This action updates a #${id} tablePrice`;
  }

  remove(id: number) {
    return `This action removes a #${id} tablePrice`;
  }
}
