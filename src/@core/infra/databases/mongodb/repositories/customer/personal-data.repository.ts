import { PreSaveCustomerPersonalDataDto } from '../../../../../application/dto/requests/customer/personal-data/pre-save-personal-data.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PersonalDataDto } from 'src/@core/application/dto/requests/customer/personal-data/personal-data.dto';
import { UpdateCustomerPersonalDataDto } from 'src/@core/application/dto/requests/customer/personal-data/update-personal-data.dto';

@Injectable()
export class PersonalDataRepository {
  constructor(
    @InjectModel('Customer')
    private readonly customer: Model<PersonalDataDto>,
  ) {}
  async create(preSavePersonalData: PreSaveCustomerPersonalDataDto) {
    return await this.customer.create(preSavePersonalData);
  }

  // TEM QUE VER O APONTAMENTO CERTO DPS
  // QUANDO O USUÁRIO FIZER LOGIN APONTAR O ID DO CUSTOMER PRO TOKEN
  async get(preRegistrationId: string) {
    return await this.customer.findOne().where({ preRegistrationId });
  }

  async update(
    preRegistrationId: string,
    updatedData: UpdateCustomerPersonalDataDto,
  ) {
    return await this.customer.updateOne({ preRegistrationId }, updatedData);
  }

  // async findByEmail(email: string, userId: string) {
  //   return await this.personalData
  //     .findOne({
  //       $and: [{ 'contactDetails.email': email }, { _id: userId }],
  //     })
  //     .exec();
  // }

  // async findByDocument(document: Document) {
  //   return await this.personalData
  //     .findOne({ 'registrationData.document': document })
  //     .exec();
  // }
  // async updateByAdmin() {}
  // async deleteByAdmin() {}
}
