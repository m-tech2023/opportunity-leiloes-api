import { PreSavePersonalDataDto } from '../../../../../application/dto/requests/account/pre-save-personal-data.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PersonalDataDto } from 'src/@core/application/dto/requests/account/personal-data.dto';
import { Document } from 'src/@core/application/dto/requests/account/document.dto';

@Injectable()
export class PersonalDataRepository {
  constructor(
    @InjectModel('PersonalData')
    private readonly personalData: Model<PersonalDataDto>,
  ) {}
  async create(preSavePersonalData: PreSavePersonalDataDto) {
    return await this.personalData.create(preSavePersonalData);
  }
  async get(userId: string) {
    return await this.personalData.findOne().where({ userId });
  }

  async update(userId: string, updatedData: PersonalDataDto) {
    return await this.personalData.updateOne({ userId }, updatedData);
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
