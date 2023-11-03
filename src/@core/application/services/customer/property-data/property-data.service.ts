import { Injectable } from '@nestjs/common';
import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';
import { PropertyDataRepository } from 'src/@core/infra/databases/mongodb/repositories/customer/property-data.repository';

@Injectable()
export class PropertyDataService {
  constructor(
    private readonly propertyDataRepository: PropertyDataRepository,
  ) {}

  async get(id: string) {
    return await this.propertyDataRepository.get(id);
  }
  async update(customerId: string, dto: PropertyDataDto) {
    return await this.propertyDataRepository.update(customerId, dto);
  }
}
