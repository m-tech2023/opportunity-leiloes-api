import { PersonalDataService } from 'src/@core/application/services/customer/personal-data/personal-data.service';
import { UpdateCustomerPersonalDataDto } from '../../../dto/requests/customer/personal-data/update-personal-data.dto';
import { Customer } from 'src/@core/domain/entities/customer/customer.entity';
import { cnpj, cpf } from 'cpf-cnpj-validator';
export class UpdatePersonalDataUsecase {
  constructor(private readonly personalDataService: PersonalDataService) {}

  async execute(userId: string, customerDto: UpdateCustomerPersonalDataDto) {
    const customer = Customer.create(customerDto as any).getAccountDetails();

    const cpfValue = customerDto.personalData.registrationData.document.cpf;
    const cnpjValue = customerDto.personalData.registrationData.document.cnpj;

    if (cpfValue) {
      if (cpfValue.length > 0 && !cpf.isValid(cpfValue)) {
        throw new Error('CPF is invalid');
      }
    }

    if (cnpjValue) {
      if (cnpjValue.length > 0 && !cnpj.isValid(cnpjValue)) {
        throw new Error('CNPJ is invalid');
      }
    }

    return await this.personalDataService.update(userId, customer);
  }
}
