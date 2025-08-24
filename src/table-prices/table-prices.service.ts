import { Injectable } from '@nestjs/common';
import { CreateTablePriceDto } from './dto/create-table-price.dto';
import { UpdateTablePriceDto } from './dto/update-table-price.dto';
import { db } from 'src/db';
import { priceTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TablePricesService {
  async create(createTablePriceDto: CreateTablePriceDto) {
    return await db.insert(priceTable).values(createTablePriceDto);
  }

  async findAll() {
    return await db.select().from(priceTable);
  }

  async findOne(id: string) {
    return await db.select().from(priceTable).where(eq(priceTable.id, id));
  }

  async update(id: string, updateTablePriceDto: UpdateTablePriceDto) {
    return await db
      .update(priceTable)
      .set(updateTablePriceDto)
      .where(eq(priceTable.id, id));
  }

  async remove(id: string) {
    return await db.delete(priceTable).where(eq(priceTable.id, id));
  }
}
