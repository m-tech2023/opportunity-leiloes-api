import { PropertyDataService } from 'src/@core/application/services/account/property-data/property-data.service';

export class GetPropertyDataUsecase {
  constructor(private readonly propertyDataService: PropertyDataService) {}

  async execute(userId: string) {
    return await this.propertyDataService.get(userId);
  }
}
