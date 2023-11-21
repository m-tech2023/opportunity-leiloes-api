import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RegistrationData {
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
