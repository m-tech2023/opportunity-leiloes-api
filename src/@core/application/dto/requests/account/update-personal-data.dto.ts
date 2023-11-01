import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RegistrationData } from './registration-data.dto';
import { ContactDetails } from './contact-details.dto';
import { Address } from './address.dto';

export class UpdatePersonalDataDto {
  id?: string;
  userId?: string;

  @ValidateNested()
  @Type(() => RegistrationData)
  @ApiProperty({ type: RegistrationData, description: 'Registration data' })
  registrationData?: RegistrationData;

  @ValidateNested()
  @Type(() => ContactDetails)
  @ApiProperty({ type: ContactDetails, description: 'ContactDetails' })
  contactDetails?: ContactDetails;

  @ValidateNested()
  @Type(() => Address)
  @ApiProperty({ type: Address, description: 'Address' })
  address?: Address;
}
