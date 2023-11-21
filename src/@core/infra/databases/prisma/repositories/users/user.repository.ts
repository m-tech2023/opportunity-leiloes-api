import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { UpdateUserDto } from 'src/@core/application/dto/requests/users/update-user.dto';

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

  async updateUser(userId: string, updatedData: User) {
    await this.prisma.document.update({
      where: {
        userId,
      },
      data: {
        [updatedData.documentName.toLowerCase()]: updatedData.document,
      },
    });

    // O userRole exige que seja um where pelo ID pq se for pelo
    // userId ele vai atualizar todos os roles igualemente daquele user
    // await this.prisma.userRole.update({
    //   where: {
    //     id: (await this.getUserRole(userId)).id,
    //   },
    //   data: {
    //     roleId: updatedData.roleName,
    //   },
    // });

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        fullName: updatedData.fullName,
        email: updatedData.email,
        password: updatedData.password,
        // restrictedForAuction: updatedData.restrictedForAuction,
      },
    });
  }

  async restrictedForAuction(userId: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        restrictedForAuction: updateUserDto.restrictedForAuction,
      },
    });
  }

  async changeUserStatusToRegistered(
    userId: string,
    updateUserDto: UpdateUserDto,
  ) {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        isPreRegistration: updateUserDto.isPreRegistration,
      },
    });
  }

  async getUserRole(userId: string) {
    return await this.prisma.userRole.findFirstOrThrow({
      where: {
        userId: userId,
      },
    });
  }

  async getAllUsers() {
    return await this.prisma.user.findMany({
      include: {
        UserRole: {
          select: {
            roleId: true,
          },
        },
      },
    });
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        UserRole: {
          select: {
            roleId: true,
          },
        },
      },
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
