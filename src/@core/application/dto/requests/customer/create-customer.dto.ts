import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PersonalDataDto } from './personal-data/personal-data.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyDataDto } from './property-data/update-property.dto';
import { AccessDataDto } from './access-data/access-data.dto';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '653be12f48b886867f464758', description: 'roleId' })
  roleId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'CPF',
    description: 'Acceptable values: CPF, CNPJ or PASSPORT.',
  })
  documentName: string;
  @IsOptional()
  @ApiProperty({
    example: Date.now(),
    required: false,
    description: 'Optional',
  })
  confirmedAt?: Date;

  @IsOptional()
  @ApiProperty({
    example: Date.now(),
    required: false,
    description: 'Optional',
  })
  updatedAt?: Date;

  @IsOptional()
  @ApiProperty({ example: false, required: false, description: 'Optional' })
  deletedAt?: Date;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PersonalDataDto)
  @ApiProperty({ type: PersonalDataDto, description: 'Customer DTO' })
  personalData: PersonalDataDto;

  @ValidateNested()
  //@IsNotEmpty()
  @Type(() => PropertyDataDto)
  @ApiProperty({ type: PropertyDataDto, description: 'Property DTO' })
  propertyData?: PropertyDataDto;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AccessDataDto)
  @ApiProperty({ type: AccessDataDto, description: 'Access Data DTO' })
  accessData?: AccessDataDto;
}
