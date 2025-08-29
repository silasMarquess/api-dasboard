import { Injectable } from '@nestjs/common';
import { CreateSalerDto } from './dto/create-saler.dto';
import { salerTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';

@Injectable()
export class SalerService {
  async create(createSalerDto: CreateSalerDto) {
    const salerCreated = await db
      .insert(salerTable)
      .values({
        ...createSalerDto,
      })
      .returning({ idNewSaler: salerTable.id });
    return salerCreated[0].idNewSaler;
  }

  async findAll() {
    const sales = await db.query.salerTable.findMany({
      with: {
        tablePrice: true,
        client: true,
      },
    });
    return sales;
  }

  async findOne(id: string) {
    const sales = await db.query.salerTable.findMany({
      where: eq(salerTable.id, id),
      with: {
        tablePrice: true,
        client: true,
      },
    });
    return sales;
  }

  async update(idSaler: string, updateSalerDto: CreateSalerDto) {
    const updatedSaler = await db
      .update(salerTable)
      .set(updateSalerDto)
      .where(eq(salerTable.id, idSaler));
    return updatedSaler;
  }

  async remove(id: string) {
    const deletedSaler = await db
      .delete(salerTable)
      .where(eq(salerTable.id, id));
    return deletedSaler;
  }
}
