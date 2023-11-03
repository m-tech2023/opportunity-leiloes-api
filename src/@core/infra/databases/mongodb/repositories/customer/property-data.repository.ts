import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { PropertyDataDto } from 'src/@core/application/dto/requests/customer/property-data/update-property.dto';
import { Customer } from 'src/@core/domain/entities/customer/customer.entity';
@Injectable()
export class PropertyDataRepository {
  constructor(
    @InjectModel('Customer')
    private readonly property: Model<Customer>,
  ) {}

  async update(id: string, updateProperty: Partial<PropertyDataDto>) {
    const teste = await this.property.updateOne(
      { preRegistrationId: id },
      { propertyData: updateProperty },
    );
    // const teste = await this.property.findOne({ preRegistrationId: id });
    console.log(teste);
  }
}
