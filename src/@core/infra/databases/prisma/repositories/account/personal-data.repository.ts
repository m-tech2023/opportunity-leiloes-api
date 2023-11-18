import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdatePersonalDataDto } from 'src/@core/application/dto/requests/customer/account/update-personal-data.dto';

@Injectable()
export class PersonalDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    // NAO FAZER NADA
  }

  async get(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullName: true,
        Document: true,
        Address: true,
        Contact: true,
        RegistrationData: true,
      },
    });
  }

  async update(userId: string, updatedData: UpdatePersonalDataDto) {
    await this.prisma.document.update({
      where: {
        userId,
      },
      data: {
        ...updatedData.document,
      },
    });

    await this.prisma.registrationData.upsert({
      where: {
        userId,
      },
      update: {
        ...updatedData.registrationData,
      },
      create: {
        userId,
        ...updatedData.registrationData,
      },
    });

    await this.prisma.contact.upsert({
      where: {
        userId,
      },
      update: {
        ...updatedData.contactDetails,
      },
      create: {
        userId,
        ...updatedData.contactDetails,
      },
    });

    await this.prisma.address.upsert({
      where: {
        userId,
      },
      update: {
        ...updatedData.address,
      },
      create: {
        userId,
        ...updatedData.address,
      },
    });
  }
}
