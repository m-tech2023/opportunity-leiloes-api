import { CustomerDto } from '../../dto/requests/customer/customer.dto';
import { CustomerRepository } from './../../../infra/databases/mongodb/repositories/customer/customer.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ManagerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async restrictCustomer(CustomerId: string, updatedData: CustomerDto) {
    return await this.customerRepository.update(CustomerId, updatedData);
  }
}
