import { Injectable } from '@nestjs/common';
import { CreateDeliveryManDto } from './dto/create-delivery-man.dto';
import { UpdateDeliveryManDto } from './dto/update-delivery-man.dto';
import { db } from 'src/db';
import { deliveryManTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

export interface pageProps {
  title: string;
  header: string;
}

@Injectable()
export class DeliveryManService {
  async create(createDeliveryManDto: CreateDeliveryManDto) {
    const deliveryMan = await db
      .insert(deliveryManTable)
      .values(createDeliveryManDto);

    return deliveryMan;
  }

  async findAll() {
    return await db.query.delieveryManTable.findMany();
  }

  async findOne(delieveryManId: string) {
    const deliveryMan = await db.query.delieveryManTable.findMany({
      where: eq(deliveryManTable.id, id),
    });
  }

  update(id: number, updateDeliveryManDto: UpdateDeliveryManDto) {}

  remove(id: number) {
    return `This action removes a #${id} deliveryMan`;
  }
}
