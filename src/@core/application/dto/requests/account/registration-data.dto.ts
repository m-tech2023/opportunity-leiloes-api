import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegistrationData {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'John', description: 'Full name' })
  fullName: string;

  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @IsOptional()
  @ApiProperty({ example: '30081203004', description: 'CPF' })
  cpf?: string;

  @IsString()
  @MaxLength(11)
  @IsOptional()
  @ApiProperty({ example: '404096633', description: 'RG' })
  rg?: string;

  @IsString()
  @MinLength(14)
  @MaxLength(14)
  @IsOptional()
  @ApiProperty({ example: '95108076000141', description: 'CNPJ' })
  cnpj?: string;

  @IsString()
  @MinLength(14)
  @MaxLength(14)
  @IsOptional()
  @ApiProperty({ description: 'PASSPORT' })
  passport?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'Brasileiro', description: 'Nationality' })
  nationality?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ example: 'Casado', description: 'MaritalStatus' })
  maritalStatus?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'Mary Jane', description: 'motherName' })
  motherName?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'Peter Parker', description: 'FatherName' })
  fatherName?: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ example: 'Super Hero', description: 'Occupation' })
  occupation?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ example: 'Marvel', description: 'Company' })
  company?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiProperty({ example: 'www.site.us', description: 'companyWebsite' })
  companyWebsite?: string;
}
