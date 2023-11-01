import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class ContactDetails {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @IsEmail()
  @ApiProperty({ example: 'john@email.com', description: 'E-mail' })
  email?: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '(11) 1234-5678', description: 'Telephone' })
  telephone?: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: '(11) 98765-4321', description: 'Cellphone' })
  cellPhone?: string;
}
