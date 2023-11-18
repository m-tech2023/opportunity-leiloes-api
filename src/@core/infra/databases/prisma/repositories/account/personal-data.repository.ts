import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { UpdatePersonalDataDto } from 'src/@core/application/dto/requests/customer/account/update-personal-data.dto';

@Injectable()
export class PersonalDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create() {
    // NAO FAZER NADA
  }

  async getUserPersonalData(userId: string) {
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
  async updateUserDocument(userId: string, documentData: any) {
    return await this.prisma.document.update({
      where: {
        userId,
      },
      data: {
        ...documentData,
      },
    });
  }

  async upsertUserRegistrationData(userId: string, registrationData: any) {
    return await this.prisma.registrationData.upsert({
      where: {
        userId,
      },
      update: {
        ...registrationData,
      },
      create: {
        userId,
        ...registrationData,
      },
    });
  }

  async upsertUserContactDetails(userId: string, contactDetails: any) {
    return await this.prisma.contact.upsert({
      where: {
        userId,
      },
      update: {
        ...contactDetails,
      },
      create: {
        userId,
        ...contactDetails,
      },
    });
  }

  async upsertUserAddress(userId: string, address: any) {
    return await this.prisma.address.upsert({
      where: {
        userId,
      },
      update: {
        ...address,
      },
      create: {
        userId,
        ...address,
      },
    });
  }

  async updateUserPersonalData(
    userId: string,
    updatedData: UpdatePersonalDataDto,
  ) {
    const { document, registrationData, contactDetails, address } = updatedData;

    await this.updateUserDocument(userId, document);
    await this.upsertUserRegistrationData(userId, registrationData);
    await this.upsertUserContactDetails(userId, contactDetails);
    await this.upsertUserAddress(userId, address);

    //return this.getUserPersonalData(userId);
  }
}
