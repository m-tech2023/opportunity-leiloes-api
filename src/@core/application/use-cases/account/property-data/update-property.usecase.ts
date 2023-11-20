import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';
import { PropertyDataService } from 'src/@core/application/services/customer/property-data/property-data.service';
export class UpdatePropertyDataUsecase {
  constructor(private readonly propertyDataService: PropertyDataService) {}

  async execute(userId: string, propertyDto: PropertyDataDto) {
    return await this.propertyDataService.update(userId, propertyDto);
  }
}
