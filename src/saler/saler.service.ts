import { Injectable } from '@nestjs/common';
import { CreateSalerDto } from './dto/create-saler.dto';
import { salerTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import { db } from 'src/db';

@Injectable()
export class SalerService {
  async create(createSalerDto: CreateSalerDto) {
    const salerCreated = await db.insert(salerTable).values({
      ...createSalerDto,
    });
    return salerCreated;
  }

  async findAll() {
    const sales = await db;
    return sales;
  }

  async findOne(id: string) {
    const sale = await db
      .select()
      .from(salerTable)
      .where(eq(salerTable.id, id));
    return sale;
  }
}
