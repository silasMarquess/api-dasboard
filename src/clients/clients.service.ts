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
    return await db.query.clientTable.findMany({
      with: {
        region: true,
        constracts: {
          with: {
            productVariant: {
              with: {
                product: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await db.query.clientTable.findFirst({
      where: eq(clientTable.id, id),
      with: {
        region: true,
        constracts: {
          with: {
            productVariant: {
              with: {
                product: true,
              },
            },
          },
        },
      },
    });
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
