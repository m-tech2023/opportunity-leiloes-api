import { Injectable } from '@nestjs/common';
import { PersonalDataRepository } from 'src/@core/infra/databases/mongodb/repositories/account/personal-data.repository';
import { PreSavePersonalDataDto } from '../../dto/requests/account/pre-save-personal-data.dto';
import { UpdatePersonalDataDto } from '../../dto/requests/account/update-personal-data.dto';
import { Document } from '../../dto/requests/account/document.dto';

@Injectable()
export class PersonalDataService {
  constructor(
    private readonly personalDataRepository: PersonalDataRepository,
  ) {}
  async createPreSave(dto: PreSavePersonalDataDto) {
    return await this.personalDataRepository.create(dto);
  }

  async get(userId: string) {
    return await this.personalDataRepository.get(userId);
  }

  async update(userId: string, data: UpdatePersonalDataDto) {
    return await this.personalDataRepository.update(userId, data);
  }

  async findByEmail(email: string) {
    return await this.personalDataRepository.findByEmail(email);
  }

  async findByDocument(document: Document) {
    return await this.personalDataRepository.findByDocument(document);
  }
}
