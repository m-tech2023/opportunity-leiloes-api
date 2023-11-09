import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';
import { PropertyDataService } from 'src/@core/application/services/customer/property-data/property-data.service';
import { Customer } from 'src/@core/domain/entities/customer/customer.entity';
export class UpdatePropertyDataUsecase {
  constructor(private readonly propertyDataService: PropertyDataService) {}

  async execute(id: string, customerDto: PropertyDataDto) {
    // const customer = Customer.create(customerDto as any).getAccountDetails();
    // console.log(customer);
    return await this.propertyDataService.update(id, customerDto);
  }
}
