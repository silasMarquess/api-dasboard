import { Injectable } from '@nestjs/common';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { db } from 'src/db';
import { productStockTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductStockService {
  async create(createProductStockDto: CreateProductStockDto) {
    return await db.insert(productStockTable).values(createProductStockDto);
  }

  async findAll() {
    return await db.query.productStockTable.findMany();
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
