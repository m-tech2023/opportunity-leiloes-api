// src/users/users.repository.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/@core/application/dto/requests/users/create-user.dto';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        username: createUserDto.fullName,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    });
  }

  async findUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Add other methods as needed
}
