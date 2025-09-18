import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { db } from 'src/db';
import { userTable } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import type HashServiceGeneratorInterface from 'src/shared/adpters/hash-generator.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('hashService')
    private readonly hashService: HashServiceGeneratorInterface,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await this.hashService.hashGenerator(createUserDto.password);
    createUserDto.password = hash;
    return await db
      .insert(userTable)
      .values({
        username: createUserDto.username,
        email: createUserDto.email,
        passwordHash: createUserDto.password,
        role: createUserDto.role,
      })
      .returning({ userName: userTable.username, email: userTable.email });
  }

  async findAll() {
    return await db.query.userTable.findMany({
      columns: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async findOne(id: string) {
    return await db.query.userTable.findFirst({
      where: eq(userTable.id, id),
      columns: {
        id: true,
        username: true,
        email: true,
      },
    });
  }

  async findEmail(email: string) {
    return await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
      columns: {
        id: true,
        username: true,
        email: true,
        passwordHash: true,
        role: true,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
