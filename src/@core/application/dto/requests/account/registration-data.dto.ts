import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegistrationData {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'John', description: 'Full name' })
  fullName?: string;

  @IsString()
  cpf?: string;

  @IsString()
  rg?: string;

  @IsString()
  passport?: string;

  @IsString()
  nationality?: string;

  @IsString()
  maritalStatus?: string;

  @IsString()
  motherName?: string;

  @IsString()
  fatherName?: string;

  @IsString()
  occupation?: string;

  @IsString()
  company?: string;

  @IsString()
  companyWebsite?: string;
}
