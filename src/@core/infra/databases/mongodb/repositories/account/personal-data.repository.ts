import { PersonalDataDTO } from './../../../../../application/dto/requests/account/personal-data.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PersonalData } from './../../../../../domain/entities/account/personal-data.entity';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class PersonalDataRepository {
  constructor(
    @InjectModel('PersonalData')
    private readonly personalData: Model<PersonalDataDTO>,
  ) {}
  async create(personalData: PersonalData) {
    return await this.personalData.create(personalData);
  }
}
