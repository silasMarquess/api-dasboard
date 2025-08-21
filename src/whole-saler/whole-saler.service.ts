import { Injectable } from '@nestjs/common';
import { CreateWholeSalerDto } from './dto/create-whole-saler.dto';
import { UpdateWholeSalerDto } from './dto/update-whole-saler.dto';

@Injectable()
export class WholeSalerService {
  create(createWholeSalerDto: CreateWholeSalerDto) {
    return 'This action adds a new wholeSaler';
  }

  findAll() {
    return `This action returns all wholeSaler`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wholeSaler`;
  }

  update(id: number, updateWholeSalerDto: UpdateWholeSalerDto) {
    return `This action updates a #${id} wholeSaler`;
  }

  remove(id: number) {
    return `This action removes a #${id} wholeSaler`;
  }
}
