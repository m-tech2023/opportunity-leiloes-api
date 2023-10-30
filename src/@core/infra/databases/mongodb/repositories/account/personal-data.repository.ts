import { PreSavePersonalDataDto } from '../../../../../application/dto/requests/account/pre-save-personal-data.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class PersonalDataRepository {
  constructor(
    @InjectModel('PersonalData')
    private readonly personalData: Model<PreSavePersonalDataDto>,
  ) {}
  async create(personalData: PreSavePersonalDataDto) {
    return await this.personalData.create(personalData);
  }
}
