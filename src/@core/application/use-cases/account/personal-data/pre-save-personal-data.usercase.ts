import { Customer } from 'src/@core/domain/entities/customer/customer.entity';
// import { PreSaveCustomerPersonalDataDto } from '../../../dto/requests/customer/personal-data/pre-save-personal-data.dto';
import { PersonalDataService } from '../../../services/customer/personal-data/personal-data.service';

export class PreSavePersonalDataUsecase {
  constructor(private readonly personalDataService: PersonalDataService) {}

  async execute(preSavePersonalDataDto) {
    // const personalData = Customer.create(
    //   preSavePersonalDataDto as any,
    // ).getCustomer();
    // return await this.personalDataService.createPreSave(personalData);
  }
}
