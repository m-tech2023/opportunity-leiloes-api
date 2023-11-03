import { PropertyDataService } from 'src/@core/application/services/customer/property-data/property-data.service';

export class GetPropertyDataUsecase {
  constructor(private readonly propertyDataService: PropertyDataService) {}

  async execute(id: string) {
    return await this.propertyDataService.get(id);
  }
}
