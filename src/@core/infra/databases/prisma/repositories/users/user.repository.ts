// src/users/users.repository.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        password: createUserDto.password,
        document: createUserDto.document,
        documentName: createUserDto.documentName,
      },
    });
    await this.prisma.userRole.create({
      data: {
        fkIdUser: user.id,
        fkIdRole: parseInt(createUserDto.roleId),
      },
    });
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserByDocument(document: string) {
    return this.prisma.user.findUnique({
      where: { document },
    });
  }

  // Add other methods as needed
}
