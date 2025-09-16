import { Injectable } from '@nestjs/common';
import { CreateStockMovimentDto } from './dto/create-stock-moviment.dto';
import { UpdateStockMovimentDto } from './dto/update-stock-moviment.dto';
import { db } from 'src/db';
import { StockDayMovimentTable } from 'src/db/schema';
import { and, eq, SQL } from 'drizzle-orm';
import { StockProducFilltersDTO } from './dto/stock-moviment-fillters';

@Injectable()
export class StockMovimentService {
  async create(createStockMovimentDto: CreateStockMovimentDto) {
    return await db
      .insert(StockDayMovimentTable)
      .values(createStockMovimentDto);
  }

  async findAll(filters?: StockProducFilltersDTO) {
    const { id_stockDay } = filters || {};
    const conditions: SQL[] = [];

    if (id_stockDay) {
      conditions.push(eq(StockDayMovimentTable.id_stockDay, id_stockDay));
    }

    return await db.query.StockDayMovimentTable.findMany({
      where: and(...conditions),
      with: {
        product_stock: true,
      },
      orderBy: (StockDayMovimentTable, { desc }) => [
        desc(StockDayMovimentTable.date),
      ],
    });
  }

  async findOne(id: string) {
    return await db.query.StockDayMovimentTable.findFirst({
      where: eq(StockDayMovimentTable.id, id),
      with: {
        product_stock: {
          with: {
            product: true,
          },
          columns: {
            id_product: false,
          },
        },
        stockDay: true,
        contract: {
          with: {
            client: true,
          },
          columns: {
            id_client: false,
            id_productVariant: false,
          },
        },
      },
      columns: {
        id_stockProduct: false,
        id_contract: false,
        id_stockDay: false,
      },
    });
  }

  async update(id: string, updateStockMovimentDto: UpdateStockMovimentDto) {
    return await db
      .update(StockDayMovimentTable)
      .set(updateStockMovimentDto)
      .where(eq(StockDayMovimentTable.id, id));
  }

  async remove(id: string) {
    return await db
      .delete(StockDayMovimentTable)
      .where(eq(StockDayMovimentTable.id, id));
  }
}
