import { Document } from 'src/@core/application/use-cases/login/types/document.type';
import { PreSaveCustomerPersonalDataDto } from '../../../../../application/dto/requests/customer/personal-data/pre-save-personal-data.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PersonalDataDto } from 'src/@core/application/dto/requests/customer/personal-data/personal-data.dto';
import { UpdateCustomerPersonalDataDto } from 'src/@core/application/dto/requests/customer/personal-data/update-personal-data.dto';
import { CustomerDto } from 'src/@core/application/dto/requests/customer/customer.dto';
import { Customer } from 'src/@core/domain/entities/customer/customer.entity';
import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel('Customer')
    private readonly customer: Model<Customer>,
  ) {}

  async create(preSavePersonalData: PreSaveCustomerPersonalDataDto) {
    return await this.customer.create(preSavePersonalData);
  }

  // TEM QUE VER O APONTAMENTO CERTO DPS
  // QUANDO O USUÁRIO FIZER LOGIN APONTAR O ID DO CUSTOMER PRO TOKEN
  async get(preRegistrationId: string) {
    return await this.customer.findOne().where({ preRegistrationId });
  }

  async findById(id: string) {
    return await this.customer.findById(id);
  }

  async findByEmail(email: string) {
    return await this.customer
      .findOne()
      .select('accessData')
      .where({ email })
      .exec();
  }
  async findByDocument(document: string) {
    return await this.customer
      .findOne()
      .select('accessData')
      .where({ 'personalData.registrationData.document': document })
      .exec();
  }

  async update(
    CustomerId: string,
    updatedData: Partial<CustomerDto>, // Use Partial<Model> para atualização parcial
  ) {
    // Use o método updateOne com o operador $set para realizar uma atualização parcial.
    await this.customer.findByIdAndUpdate(CustomerId, {
      $set: updatedData,
    });
  }
}
