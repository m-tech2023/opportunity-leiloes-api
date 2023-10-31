import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RegistrationData } from './registration-data.dto';

export class UpdatePersonalData {
  @ValidateNested()
  @Type(() => RegistrationData)
  @ApiProperty({ type: RegistrationData, description: 'Registration data' })
  registrationData?: RegistrationData;
}
