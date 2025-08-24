import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { clientTable } from 'src/db/schema';
import { db } from 'src/db';
import { eq } from 'drizzle-orm';

@Injectable()
export class ClientsService {
  async create(createClientDto: CreateClientDto) {
    return await db.insert(clientTable).values(createClientDto);
  }

  async findAll() {
    return await db.select().from(clientTable);
  }

  async findOne(id: string) {
    return await db.select().from(clientTable).where(eq(clientTable.id, id));
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    return await db
      .update(clientTable)
      .set(updateClientDto)
      .where(eq(clientTable.id, id));
  }

  async remove(id: string) {
    return await db.delete(clientTable).where(eq(clientTable.id, id));
  }
}
