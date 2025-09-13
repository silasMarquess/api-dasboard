import { Injectable } from '@nestjs/common';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { db } from 'src/db';
import { productStockTable } from 'src/db/schema';
import { and, eq, SQL } from 'drizzle-orm';
import { ProductStockFilter } from './dto/fillters.producStock-dto';

@Injectable()
export class ProductStockService {
  async create(createProductStockDto: CreateProductStockDto) {
    return await db.insert(productStockTable).values(createProductStockDto);
  }

  async findAll(filter?: ProductStockFilter) {
    const { id_product } = filter ?? {};
    const conditions: SQL[] = [];

    if (id_product) {
      conditions.push(eq(productStockTable.id_product, id_product));
    }

    return await db.query.productStockTable.findMany({
      where: and(...conditions),
    });
  }

  async findOne(id: string) {
    return await db.query.productStockTable.findFirst({
      where: eq(productStockTable.id, id),
    });
  }

  async update(id: string, updateProductStockDto: UpdateProductStockDto) {
    return await db
      .update(productStockTable)
      .set(updateProductStockDto)
      .where(eq(productStockTable.id, id));
  }

  async remove(id: string) {
    return await db
      .delete(productStockTable)
      .where(eq(productStockTable.id, id));
  }
}
