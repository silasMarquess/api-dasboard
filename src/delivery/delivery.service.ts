import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { db } from 'src/db';
import { deliveryTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class DeliveryService {
  async create(createDeliveryDto: CreateDeliveryDto) {
    const delivery = await db.insert(deliveryTable).values(createDeliveryDto);
    return delivery;
  }

  async findAll() {
    return db.query.deliveryTable.findMany({
      with: {
        saler: true,
        deliveryMan: true,
      },
    });
  }

  async findOne(id: string) {
    return db.query.deliveryTable.findFirst({
      where: eq(deliveryTable.id, id),
      with: {
        deliveryMan: true,
        saler: true,
      },
    });
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    return await db
      .update(deliveryTable)
      .set(updateDeliveryDto)
      .where(eq(deliveryTable.id, id));
  }

  async remove(id: string) {
    return await db.delete(deliveryTable).where(eq(deliveryTable.id, id));
  }
}
