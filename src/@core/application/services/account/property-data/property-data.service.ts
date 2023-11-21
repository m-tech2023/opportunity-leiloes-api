import { Injectable } from '@nestjs/common';
import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';
import { PropertyDataRepository } from 'src/@core/infra/databases/prisma/repositories/account/property-data.repository';

@Injectable()
export class PropertyDataService {
  constructor(
    private readonly propertyDataRepository: PropertyDataRepository,
  ) {}

  async get(userId: string) {
    return await this.propertyDataRepository.get(userId);
  }
  async update(userId: string, dto: PropertyDataDto) {
    return await this.propertyDataRepository.update(userId, dto);
  }
}
