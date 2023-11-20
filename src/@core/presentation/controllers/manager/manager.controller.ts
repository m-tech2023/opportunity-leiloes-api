import { HttpStatus } from '@nestjs/common/enums';
import { Controller, Param, UseGuards, Put, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { Response } from 'express';
import { RestrictUserInTheAuctionUsecase } from 'src/@core/application/use-cases/manager/restrict-user-in-the-auction.usecase';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';

@Controller('manager')
export class ManagerController {
  constructor(
    private readonly restrictUserInTheAuctionUsecase: RestrictUserInTheAuctionUsecase,
    private readonly findUserById: FindByIdUseCase,
  ) {}

  @Put('restrict-user-auction/:id')
  @ApiOperation({ summary: 'Route for the manager to restrict a customer' })
  @ApiBearerAuth()
  @ApiTags('Manager')
  @UseGuards(AuthorizationGuard)
  async restrictUserInTheAuction(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const user: any = await this.findUserById.execute(id);

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'Customer not found',
        });
      }

      await this.restrictUserInTheAuctionUsecase.execute(id, user);

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
