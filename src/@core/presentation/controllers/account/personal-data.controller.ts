import { User } from 'src/@core/infra/frameworks/nestjs/modules/users/decorators/user.decorator';
import { GetPersonalDataUsecase } from './../../../application/use-cases/account/get-personal-data.usecase';
import { Controller, HttpStatus, Res, Get, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';

@Controller('account')
export class PersonalDataController {
  constructor(
    private readonly getPersonalDataUsecase: GetPersonalDataUsecase,
  ) {}

  @Get('personal-data')
  @ApiOperation({
    summary: 'List all personal data of the  authenticated user',
  })
  @ApiBearerAuth()
  @ApiTags('Account')
  @UseGuards(AuthorizationGuard)
  async index(@User() user, @Res() res: Response) {
    try {
      console.log(user);
      const data = await this.getPersonalDataUsecase.execute(user._id);
      return res.status(HttpStatus.OK).json({ data });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
