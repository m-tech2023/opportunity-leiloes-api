import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PersonalDataDto } from './personal-data.dto';

export class UpdatePersonalDataDto {
  id?: string;
  userId?: string;
  isValidCustomer: boolean;
  roleName?: string;
  createdAt?: Date;
  confirmedAt?: Date;
  deletedAt?: Date;
  @IsNotEmpty()
  updatedAt: Date;
  @ValidateNested()
  @Type(() => PersonalDataDto)
  @IsNotEmpty()
  @ApiProperty({ type: PersonalDataDto, description: 'Personal Data' })
  personalData: PersonalDataDto;
}
