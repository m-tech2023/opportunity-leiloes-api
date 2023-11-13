import { CustomerRepository } from './../../../infra/databases/mongodb/repositories/customer/customer.repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async findById(id: string) {
    return await this.customerRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.customerRepository.findByEmail(email);
  }
  async findByDocument(document: string) {
    return await this.customerRepository.findByDocument(document);
  }
}
