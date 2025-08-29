import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { db } from 'src/db';
import { constractTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ContractService {
  async create(createContractDto: CreateContractDto) {
    const responseContract = await db
      .insert(constractTable)
      .values(createContractDto)
      .returning({ id: constractTable.id });
    return responseContract[0].id;
  }

  async findAll() {
    return await db.query.constractTable.findMany({
      with: {
        client: true,
        product: true,
      },
    });
  }

  async findOne(id: string) {
    return await db.query.constractTable.findMany({
      where: eq(constractTable.id, id),
      with: {
        client: true,
        product: true,
      },
    });
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    return await db
      .update(constractTable)
      .set(updateContractDto)
      .where(eq(constractTable.id, id))
      .returning({ id: constractTable.id });
  }

  async remove(id: string) {
    return await db.delete(constractTable).where(eq(constractTable.id, id));
  }
}
