import { Address } from '../../../../../application/dto/requests/customer/personal-data/address.dto';
import { Injectable } from '@nestjs/common';
import { PersonalDataDto } from 'src/@core/application/dto/requests/customer/personal-data/personal-data.dto';
import { PrismaService } from '../../prisma.service';
import { UpdatePersonalDataDto } from 'src/@core/application/dto/requests/customer/account/update-personal-data.dto';

@Injectable()
export class PersonalDataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(preSavePersonalData) {
    //   // return await this.customer.create(preSavePersonalData);
  }

  async get(userId: string) {
    return await this.prisma.user.findFirst({
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
    return await this.prisma.document.update({
      where: {
        userId,
      },
      data: {
        ...updatedData.document,
      },
    });
  }
}
