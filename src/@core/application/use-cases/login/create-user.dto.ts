import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { EmailAlreadyUsed } from 'src/@core/infra/validations/decorators/email-already-used';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'John', description: 'name' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'Doe', description: 'lastname' })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(255)
  @IsEmail()
  // @EmailAlreadyUsed()
  @ApiProperty({ example: 'john.doe@any-email.com', description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '60925616036', description: 'Provide a valid CPF, CNPJ or PASSPORT.' })
  document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'CPF', description: 'Acceptable values: CPF, CNPJ or PASSPORT.' })
  documentName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '653be12f48b886867f4647589', description: 'roleId' })
  roleId: String;

  @IsOptional()
  @ApiProperty({ example: Date.now(), required: false, description: 'Optional' })
  confirmedAt?: Date;

  @IsOptional()
  @ApiProperty({ example: true, required: false, description: 'Optional' })
  updatedAt?: Date;

  @IsOptional()
  @ApiProperty({ example: false, required: false, description: 'Optional' })
  deletedAt?: Date;
}
