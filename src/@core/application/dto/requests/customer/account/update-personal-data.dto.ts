import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RegistrationData } from '../personal-data/registration-data.dto';
import { ContactDetails } from '../personal-data/contact-details.dto';
import { Address } from '../personal-data/address.dto';
import { Document } from '../personal-data/document.dto';

export class UpdatePersonalDataDto {
  id?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'John', description: 'name' })
  fullName: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => Document)
  @ApiProperty({ type: Document, description: 'Document' })
  document: Document;

  @ValidateNested()
  @Type(() => RegistrationData)
  // @IsNotEmpty()
  @ApiProperty({ type: RegistrationData, description: 'Registration data' })
  registrationData?: RegistrationData;

  @ValidateNested()
  // @IsNotEmpty()
  @Type(() => ContactDetails)
  @ApiProperty({ type: ContactDetails, description: 'ContactDetails' })
  contactDetails?: ContactDetails;

  @ValidateNested()
  // @IsNotEmpty()
  @Type(() => Address)
  @ApiProperty({ type: Address, description: 'Address' })
  address?: Address;
}
