import { Injectable } from '@nestjs/common';
import { CreateStockDayDto } from './dto/create-stock-day.dto';
import { UpdateStockDayDto } from './dto/update-stock-day.dto';
import { db } from 'src/db';
import { stockDayTable } from 'src/db/schema';
import { and, eq, SQL } from 'drizzle-orm';

@Injectable()
export class StockDayService {
  async create(createStockDayDto: CreateStockDayDto) {
    return await db.insert(stockDayTable).values(createStockDayDto).returning();
  }

  async findAll(filters: { productId?: string }) {
    const { productId } = filters;

    const conditions: SQL[] = [];

    if (productId) {
      conditions.push(eq(stockDayTable.id_product, productId));
    }

    return db.query.stockDayTable.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      with: {
        product: true,
      },
      columns: {
        id_product: false,
      },
      orderBy: (stockDayTable, { desc }) => [desc(stockDayTable.date)],
    });
  }

  async findOne(id: string) {
    return db.query.stockDayTable.findFirst({
      where: eq(stockDayTable.id, id),
      with: {
        product: true,
        stockDayMoviments: true,
      },
    });
  }

  async update(id: string, updateStockDayDto: UpdateStockDayDto) {
    return await db
      .update(stockDayTable)
      .set(updateStockDayDto)
      .where(eq(stockDayTable.id, id))
      .returning();
  }

  async remove(id: string) {
    return await db.delete(stockDayTable).where(eq(stockDayTable.id, id));
  }
}
