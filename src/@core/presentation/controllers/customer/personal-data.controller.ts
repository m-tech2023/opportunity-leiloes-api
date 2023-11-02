import { UpdatePersonalDataUsecase } from '../../../application/use-cases/customer/personal-data/update-personal-data.usecase';
import { User } from 'src/@core/infra/frameworks/nestjs/modules/users/decorators/user.decorator';
import { GetPersonalDataUsecase } from '../../../application/use-cases/customer/personal-data/get-personal-data.usecase';
import {
  Controller,
  HttpStatus,
  Res,
  Get,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { UpdateCustomerPersonalDataDto } from 'src/@core/application/dto/requests/customer/personal-data/update-personal-data.dto';

@Controller('account')
export class PersonalDataController {
  constructor(
    private readonly getPersonalDataUsecase: GetPersonalDataUsecase,
    private readonly updatePersonalDataUsecase: UpdatePersonalDataUsecase,
  ) {}

  @Get('personal-data')
  @ApiOperation({
    summary: 'List all personal data of the authenticated user',
  })
  @ApiBearerAuth()
  @ApiTags('Account')
  @UseGuards(AuthorizationGuard)
  async index(@User() { _id }, @Res() res: Response) {
    try {
      const data = await this.getPersonalDataUsecase.execute(_id);
      return res.status(HttpStatus.OK).json({ data });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
    }
  }

  @Put('personal-data')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({
    summary: 'Update personal data of the authenticated user',
  })
  @ApiBearerAuth()
  @ApiTags('Account')
  @ApiBody({ type: UpdateCustomerPersonalDataDto })
  async update(
    @Body() updatePersonalDataDto: UpdateCustomerPersonalDataDto,
    @User() { _id },
    @Res() res: Response,
  ) {
    try {
      await this.updatePersonalDataUsecase.execute(_id, updatePersonalDataDto);
      return res.status(HttpStatus.OK).json({
        message: 'Personal data updated successfully!',
      });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }
}
