import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Address {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(10)
  @IsOptional()
  @ApiProperty({ example: '12345-678', description: 'Zip Code' })
  zipCode?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  @ApiProperty({ example: '123 Main St', description: 'Address' })
  address?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  @IsOptional()
  @ApiProperty({ example: '42', description: 'Number' })
  number?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @IsOptional()
  @ApiProperty({ example: 'Downtown', description: 'Neighborhood' })
  neighborhood?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'Cityville', description: 'City' })
  city?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  @ApiProperty({ example: 'Stateville', description: 'State' })
  state?: string;
}
