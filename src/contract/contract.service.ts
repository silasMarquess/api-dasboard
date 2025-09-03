import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { db } from 'src/db';
import { contractTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ContractService {
  async create(createContractDto: CreateContractDto) {
    const responseContract = await db
      .insert(contractTable)
      .values(createContractDto)
      .returning({ id: contractTable.id });
    return responseContract[0].id;
  }

  async findAll() {
    return await db.query.contractTable.findMany({
      with: {
        client: true,
        productVariant: {
          with: {
            product: true,
          },
        },
      },
      orderBy: (contractTable, { desc }) => [desc(contractTable.dateStart)],
    });
  }

  async findOne(id: string) {
    return await db.query.contractTable.findFirst({
      where: eq(contractTable.id, id),
      with: {
        client: true,
        productVariant: {
          with: {
            product: true,
          },
        },
      },
    });
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    return await db
      .update(contractTable)
      .set(updateContractDto)
      .where(eq(contractTable.id, id))
      .returning({ id: contractTable.id });
  }

  async remove(id: string) {
    return await db.delete(contractTable).where(eq(contractTable.id, id));
  }
}
