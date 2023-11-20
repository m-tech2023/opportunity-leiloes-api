import { HttpStatus } from '@nestjs/common/enums';
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
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { Response } from 'express';
import { Customer } from 'src/@core/domain/entities/customer/customer.entity';
import { RestrictUserInTheAuctionUsecase } from 'src/@core/application/use-cases/manager/restrict-user-in-the-auction.usecase';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';
import { User } from 'src/@core/domain/entities/users/user.entity';

@Controller('manager')
export class ManagerController {
  constructor(
    private readonly restrictUserInTheAuctionUsecase: RestrictUserInTheAuctionUsecase,
    private readonly findUserById: FindByIdUseCase,
  ) {}

  @Put('restrict-customers/:id')
  @ApiOperation({ summary: 'Route for the manager to restrict a customer' })
  @ApiBearerAuth()
  @ApiTags('Users')
  @UseGuards(AuthorizationGuard)
  async restrictUserInTheAuction(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const user = await this.findUserById.execute(id);
      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Customer not found',
        });
      }
      const isRestricted = user.restrictedForAuction ? false : true;
      await this.restrictUserInTheAuctionUsecase.execute(id, { isRestricted });
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
