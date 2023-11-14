import { CustomerRepository } from 'src/@core/infra/databases/mongodb/repositories/customer/customer.repository';
import { CustomerDto } from '../../dto/requests/customer/customer.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async restrictCustomer(CustomerId: string, updatedData: CustomerDto) {
    return await this.customerRepository.update(CustomerId, updatedData);
  }
}
