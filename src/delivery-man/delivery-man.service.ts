import { Injectable } from '@nestjs/common';
import { CreateDeliveryManDto } from './dto/create-delivery-man.dto';
import { UpdateDeliveryManDto } from './dto/update-delivery-man.dto';
import { db } from 'src/db';
import { deliveryManTable } from 'src/db/schema';

@Injectable()
export class DeliveryManService {
  async create(createDeliveryManDto: CreateDeliveryManDto) {
    const deliveryMan = await db
      .insert(deliveryManTable)
      .values(createDeliveryManDto);

    return deliveryMan;
  }

  async findAll() {
    return await db.select().from(deliveryManTable);
  }

  findOne(id: number) {
    return `This action returns a #${id} deliveryMan`;
  }

  update(id: number, updateDeliveryManDto: UpdateDeliveryManDto) {
    return `This action updates a #${id} deliveryMan`;
  }

  remove(id: number) {
    return `This action removes a #${id} deliveryMan`;
  }
}
