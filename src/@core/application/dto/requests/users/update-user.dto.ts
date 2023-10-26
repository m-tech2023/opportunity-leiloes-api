import {
  IsString,
  MinLength,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { EmailAlreadyUsed } from 'src/@core/infra/validations/decorators/email-already-used';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(255)
  @IsEmail()
  @EmailAlreadyUsed()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(255)
  password?: string;
}
