import { IsNotEmpty, ValidateNested } from 'class-validator';
import { PersonalDataDto } from './personal-data/personal-data.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyDataDto } from './property-data/update-property.dto';
import { AccessDataDto } from './access-data/access-data.dto';

export class CustomerDto {
  id?: string;
  isValidCustomer?: boolean;
  isRestricted?: boolean;
  roleName?: string;
  createdAt?: Date;
  confirmedAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  @ValidateNested()
  //@IsNotEmpty()
  @Type(() => PersonalDataDto)
  @ApiProperty({ type: PersonalDataDto, description: 'Customer DTO' })
  personalData?: PersonalDataDto;

  @ValidateNested()
  //@IsNotEmpty()
  @Type(() => PropertyDataDto)
  @ApiProperty({ type: PropertyDataDto, description: 'Property DTO' })
  propertyData?: PropertyDataDto;

  @ValidateNested()
  //@IsNotEmpty()
  @Type(() => AccessDataDto)
  @ApiProperty({ type: AccessDataDto, description: 'Access Data DTO' })
  accessData?: AccessDataDto;

  myFavorites?: {};

  myBids?: {};
}
