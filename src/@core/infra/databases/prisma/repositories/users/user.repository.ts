import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from 'src/@core/domain/entities/users/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User) {
    const user = await this.prisma.user.create({
      data: {
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        Document: {
          // Associando o documento ao usuário
          create: {
            [data.documentName.toLowerCase()]: data.document,
          },
        },
        UserRole: {
          // Associando o papel ao usuário
          create: {
            role: {
              connect: { roleName: data.roleName },
            },
          },
        },
      },
      include: {
        Document: true,
        UserRole: true, // Retorna o UserRole junto com o usuário criado
      },
    });
    return user;
  }

  async updateUser(id: string, updatedData: User) {
    await this.prisma.document.update({
      where: {
        userId: id,
      },
      data: {
        [updatedData.documentName.toLowerCase()]: updatedData.document,
      },
    });

    await this.prisma.userRole.update({
      where: {
        id,
      },
      data: {
        userId: updatedData.roleName,
      },
    });

    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        fullName: updatedData.fullName,
        email: updatedData.email,
        password: updatedData.password,
      },
    });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        Document: true, // Include the document related to the user
      },
    });
  }

  async findUserByDocument(document: string) {
    return await this.prisma.document.findFirst({
      where: {
        OR: [
          {
            cpf: document,
          },
          {
            cnpj: document,
          },
          {
            rg: document,
          },
          {
            passport: document,
          },
        ],
      },
      include: {
        User: true,
      },
    });
  }

  async deleteUserById(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
