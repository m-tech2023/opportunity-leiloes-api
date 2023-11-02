import { Injectable } from '@nestjs/common';
import { PersonalDataRepository } from 'src/@core/infra/databases/mongodb/repositories/customer/personal-data.repository';
import { PreSaveCustomerPersonalDataDto } from '../../../dto/requests/customer/personal-data/pre-save-personal-data.dto';
import { UpdateCustomerPersonalDataDto } from '../../../dto/requests/customer/personal-data/update-personal-data.dto';

@Injectable()
export class PersonalDataService {
  constructor(
    private readonly personalDataRepository: PersonalDataRepository,
  ) {}
  async createPreSave(dto: PreSaveCustomerPersonalDataDto) {
    return await this.personalDataRepository.create(dto);
  }

  async get(userId: string) {
    return await this.personalDataRepository.get(userId);
  }

  async update(userId: string, data: UpdateCustomerPersonalDataDto) {
    return await this.personalDataRepository.update(userId, data);
  }

  // async findByEmail(email: string, userId: string) {
  //   return await this.personalDataRepository.findByEmail(email, userId);
  // }

  // async findByDocument(document: Document) {
  //   return await this.personalDataRepository.findByDocument(document);
  // }
}
