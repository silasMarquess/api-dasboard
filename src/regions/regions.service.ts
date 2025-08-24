import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { db } from 'src/db';
import { regionTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class RegionsService {
  async create(createRegionDto: CreateRegionDto) {
    return await db.insert(regionTable).values({ ...createRegionDto });
  }

  async findAll() {
    return await db.select().from(regionTable);
  }

  async findOne(id: string) {
    return await db.select().from(regionTable).where(eq(regionTable.id, id));
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    return await db
      .update(regionTable)
      .set({ ...updateRegionDto })
      .where(eq(regionTable.id, id));
  }

  async remove(id: string) {
    return await db.delete(regionTable).where(eq(regionTable.id, id));
  }
}
