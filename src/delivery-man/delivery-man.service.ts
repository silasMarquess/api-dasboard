import { Injectable } from '@nestjs/common';
import { CreateDeliveryManDto } from './dto/create-delivery-man.dto';

import { db } from 'src/db';

import { eq } from 'drizzle-orm';
import { deliveryManTable } from 'src/db/schema';

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
    return await db.query.deliveryManTable.findMany({
      with: {
        salers: true,
      },
    });
  }

  async findById(id: string) {
    return await db.query.deliveryManTable.findFirst({
      where: eq(deliveryManTable.id, id),
    });
  }

  async update(
    deliveryManId: string,
    updateData: Partial<CreateDeliveryManDto>,
  ) {
    await db
      .update(deliveryManTable)
      .set(updateData)
      .where(eq(deliveryManTable.id, deliveryManId));
  }

  async remove(id: string) {
    await db.delete(deliveryManTable).where(eq(deliveryManTable.id, id));
  }
}
