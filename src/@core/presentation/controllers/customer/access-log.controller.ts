import { HttpStatus } from '@nestjs/common/enums';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetAllLogsAuthenticatedUserUsecase } from '../../../application/use-cases/access-log/get-all-logs-authenticated -user.usecase';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { User } from 'src/@core/infra/frameworks/nestjs/modules/users/decorators/user.decorator';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { Response } from 'express';

@Controller('account')
export class AccessLogController {
  constructor(
    private readonly getAllLogsAuthenticatedUser: GetAllLogsAuthenticatedUserUsecase,
  ) {}

  @Get('logs')
  @ApiOperation({ summary: 'Get authenticated user logs' })
  @ApiBearerAuth()
  @ApiTags('Account')
  @UseGuards(AuthorizationGuard)
  async index(@User() user, @Res() res: Response) {
    try {
      const data = await this.getAllLogsAuthenticatedUser.execute(user._id);
      return res.status(HttpStatus.OK).json({ data });
    } catch ({ message }) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message });
    }
  }
}
