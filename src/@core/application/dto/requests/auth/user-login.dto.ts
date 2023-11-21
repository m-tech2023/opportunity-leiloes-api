import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(255)
  @ApiProperty({
    example: 'john.doe@server.com',
    description: 'Provide a valid E-mail, CPF, CNPJ or PASSPORT.',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;
}
