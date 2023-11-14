import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from 'src/@core/domain/entities/users/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: User) {
    const user = await this.prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        document: data.document,
        documentName: data.documentName,
      },
    });
    await this.prisma.userRole.create({
      data: {
        fkIdUser: user.id,
        fkIdRole: data.roleId,
      },
    });
  }

  async updateUser(id: string, updatedData: User) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        fullName: updatedData.fullName,
        email: updatedData.email,
        password: updatedData.password,
        document: updatedData.document,
        documentName: updatedData.documentName,
      },
    });
  }
  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserByDocument(document: string) {
    return await this.prisma.user.findUnique({
      where: { document },
    });
  }

  async deleteUserById(id: string) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
