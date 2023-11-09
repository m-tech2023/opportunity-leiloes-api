import { CustomerService } from '../../services/customer/customer.service';

export class FindCustomerByIdUseCase {
  constructor(private readonly CustomerService: CustomerService) {}

  async execute(id: string) {
    return await this.CustomerService.findById(id);
  }
}
