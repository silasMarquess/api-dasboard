import { Injectable } from '@nestjs/common';
import { CreateStockDayDto } from './dto/create-stock-day.dto';
import { UpdateStockDayDto } from './dto/update-stock-day.dto';

@Injectable()
export class StockDayService {
  create(createStockDayDto: CreateStockDayDto) {
    return 'This action adds a new stockDay';
  }

  findAll() {
    return `This action returns all stockDay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockDay`;
  }

  update(id: number, updateStockDayDto: UpdateStockDayDto) {
    return `This action updates a #${id} stockDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockDay`;
  }
}
