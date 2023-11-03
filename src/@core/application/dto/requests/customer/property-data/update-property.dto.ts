import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsNotEmpty, MaxLength } from 'class-validator';
import { ContactDetails } from '../personal-data/contact-details.dto';
import { Address } from '../personal-data/address.dto';
export class PropertyDataDto {
  id?: string;
  preRegistrationId?: string;

  @IsNotEmpty()
  @MaxLength(255)
  farmName?: string;

  @IsNotEmpty()
  updatedAt: Date;

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
