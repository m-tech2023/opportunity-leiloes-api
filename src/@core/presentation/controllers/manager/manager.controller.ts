import { ChangeUserStatusToRegisteredUseCase } from './../../../application/use-cases/manager/change-user-status-to-registered.usecase';
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
    private readonly changeUserStatusToRegisteredUseCase: ChangeUserStatusToRegisteredUseCase,
    private readonly findUserById: FindByIdUseCase,
  ) {}

  @Put('restrict-user-auction/:id')
  @ApiOperation({
    summary: 'Route for the manager to restrict the auction user',
  })
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
          message: 'User not found',
        });
      }

      await this.restrictUserInTheAuctionUsecase.execute(id, user);

      return res.status(HttpStatus.OK).json({
        message: 'User successfully restricted!',
      });
    } catch (message) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }

  @Put('change-pre-registration/:id')
  @ApiOperation({
    summary:
      'Route for the manager to change the users status from pre-registered to registered',
  })
  @ApiTags('Manager')
  @UseGuards(AuthorizationGuard)
  async changeUserStatusToRegistered(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const user: any = await this.findUserById.execute(id);

      if (!user) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'User not found',
        });
      }

      await this.changeUserStatusToRegisteredUseCase.execute(id, user);

      return res.status(HttpStatus.OK).json({
        message: 'Registered successfully changed!',
      });
    } catch (message) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message,
      });
    }
  }
}
