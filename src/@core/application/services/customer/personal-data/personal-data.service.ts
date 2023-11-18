import { Injectable } from '@nestjs/common';
import { UpdatePersonalDataDto } from 'src/@core/application/dto/requests/customer/account/update-personal-data.dto';
import { PersonalDataRepository } from 'src/@core/infra/databases/prisma/repositories/account/personal-data.repository';

@Injectable()
export class PersonalDataService {
  constructor(
    private readonly personalDataRepository: PersonalDataRepository,
  ) {}

  async createPreSave(dto) {
    return await this.personalDataRepository.create(dto);
  }

  async get(userId: string) {
    return await this.personalDataRepository.get(userId);
  }

  async update(userId: string, data: UpdatePersonalDataDto) {
    return await this.personalDataRepository.update(userId, data);
  }
}
