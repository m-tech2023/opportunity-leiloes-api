import { Customer } from 'src/@core/domain/entities/customer/customer.entity';
import { CreateCustomerDto } from '../../dto/requests/customer/create-customer.dto';
import { CustomerService } from '../../services/customer/customer.service';
import { cnpj, cpf } from 'cpf-cnpj-validator';
import { onlyNumbers } from 'src/@core/infra/utils/regex/clean-numeric-str';

export class CreateCustomerUseCase {
  constructor(private readonly customerService: CustomerService) {}

  async execute(createCustomerDto: CreateCustomerDto) {
    const customer = Customer.create(createCustomerDto as any).getCustomer();

    const findUserByEmail = await this.customerService.findByEmail(
      customer.accessData.email,
    );
    if (findUserByEmail) {
      throw new Error('User already registered with this e-mail address.');
    }

    const validDocument =
      cpf.isValid(
        createCustomerDto.personalData.registrationData.document.cpf,
      ) ||
      cnpj.isValid(
        createCustomerDto.personalData.registrationData.document.cnpj,
      );
    const data = {
      document: customer.personalData.registrationData.document,
    };

    const findUserByDocument = await this.customerService.findByDocument(data);
    if (findUserByDocument) {
      throw new Error('User already registered with this document.');
    }

    return await this.customerService.create(customer);
  }
}
