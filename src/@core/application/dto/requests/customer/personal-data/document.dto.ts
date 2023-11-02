import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class Document {
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
  @MaxLength(255)
  @IsOptional()
  @ApiProperty({ description: 'PASSPORT' })
  passport?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  @ApiProperty({ description: 'IE' })
  ie?: string;
}
