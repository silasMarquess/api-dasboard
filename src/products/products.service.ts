import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { db } from 'src/db';
import { productTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  async create(createProductDto: CreateProductDto) {
    return await db.insert(productTable).values(createProductDto);
  }

  async findAll() {
    return await db.query.productTable.findMany({
      with: {
        productStock: true,
      },
    });
  }

  async findOne(id: string) {
    return await db.query.productTable.findFirst({
      where: eq(productTable.id, id),
      with: {
        productStock: true,
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await db
      .update(productTable)
      .set(updateProductDto)
      .where(eq(productTable.id, id));
  }

  async remove(id: string) {
    return await db.delete(productTable).where(eq(productTable.id, id));
  }
}
