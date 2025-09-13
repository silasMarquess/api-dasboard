import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { db } from 'src/db';
import { contractTable } from 'src/db/schema';
import { and, eq, gte, lte, SQL } from 'drizzle-orm';
import { Filters } from './dto/filter-params-dto';

@Injectable()
export class ContractService {
  async create(createContractDto: CreateContractDto) {
    const responseContract = await db
      .insert(contractTable)
      .values(createContractDto)
      .returning({ id: contractTable.id });
    return responseContract[0].id;
  }

  async findAll(filters: Filters) {
    const { status, dateStart, dateEnd } = filters;

    const conditions: SQL[] = [];

    if (status !== undefined) {
      conditions.push(eq(contractTable.status, status));
    }
    if (dateStart) {
      conditions.push(gte(contractTable.dateStart, dateStart));
    }
    if (dateEnd) {
      conditions.push(lte(contractTable.dateEnd, dateEnd));
    }

    return await db.query.contractTable.findMany({
      where: and(...conditions),
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
