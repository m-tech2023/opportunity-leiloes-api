import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'John', description: 'name' })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(255)
  @IsEmail()
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
  @ApiProperty({
    example: '60925616036',
    description: 'Provide a valid CPF, CNPJ or PASSPORT.',
  })
  document: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'CPF',
    description: 'Acceptable values: CPF, CNPJ or PASSPORT.',
  })
  documentName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1', description: 'roleId' })
  roleId: string;

  @IsOptional()
  @ApiProperty({
    example: Date.now(),
    required: false,
    description: 'Optional',
  })
  updatedAt?: Date;
}
