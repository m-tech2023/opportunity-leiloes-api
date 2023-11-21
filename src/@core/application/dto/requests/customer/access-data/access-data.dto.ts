import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AccessDataDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(255)
  @IsEmail()
  //@EmailAlreadyUsed()
  @ApiProperty({ example: 'john.doe@any-email.com', description: 'email' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;
}
