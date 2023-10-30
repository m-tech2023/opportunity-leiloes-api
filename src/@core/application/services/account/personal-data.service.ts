import { Injectable } from '@nestjs/common';
import { PersonalDataRepository } from 'src/@core/infra/databases/mongodb/repositories/account/personal-data.repository';
import { PreSavePersonalDataDto } from '../../dto/requests/account/pre-save-personal-data.dto';

@Injectable()
export class PersonalDataService {
  constructor(
    private readonly personalDataRepository: PersonalDataRepository,
  ) {}
  async createPreSave(dto: PreSavePersonalDataDto) {
    return await this.personalDataRepository.create(dto);
  }
}
