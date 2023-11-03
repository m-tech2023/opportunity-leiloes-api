import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty } from 'class-validator';
import { RegistrationData } from './registration-data.dto';
import { ContactDetails } from './contact-details.dto';
import { Address } from './address.dto';
export class PersonalDataDto {
  @ValidateNested()
  @Type(() => RegistrationData)
  @IsNotEmpty()
  @ApiProperty({ type: RegistrationData, description: 'Registration data' })
  registrationData: RegistrationData;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ContactDetails)
  @ApiProperty({ type: ContactDetails, description: 'ContactDetails' })
  contactDetails?: ContactDetails;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Address)
  @ApiProperty({ type: Address, description: 'Address' })
  address?: Address;
}
