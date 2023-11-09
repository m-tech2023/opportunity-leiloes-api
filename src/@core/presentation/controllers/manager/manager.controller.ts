import { HttpStatus } from '@nestjs/common/enums';
import { FindCustomerByIdUseCase } from './../../../application/use-cases/customer/find-by-id.usecase';
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RestrictCustomerUsecase } from 'src/@core/application/use-cases/manager/restrict-customer.usecase';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { Response } from 'express';
import { Customer } from 'src/@core/domain/entities/customer/customer.entity';

@Controller('manager')
export class ManagerController {
  constructor(
    private readonly restrictCustomerUsecase: RestrictCustomerUsecase,
    private readonly findCustomerByIdUseCase: FindCustomerByIdUseCase,
  ) {}

  @Put('restrict-customers/:id')
  @ApiOperation({ summary: 'Route for the manager to restrict a customer' })
  @ApiBearerAuth()
  @ApiTags('Users')
  @UseGuards(AuthorizationGuard)
  async restrictCustomer(@Param('id') id: string, @Res() res: Response) {
    try {
      const customer: Customer = await this.findCustomerByIdUseCase.execute(id);
      if (!customer) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Customer not found',
        });
      }
      const isRestricted = customer.isRestricted ? false : true;
      await this.restrictCustomerUsecase.execute(id, { isRestricted });
      return res.status(HttpStatus.OK).json({
        message: 'Client successfully restricted!',
      });
    } catch (message) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }
}
