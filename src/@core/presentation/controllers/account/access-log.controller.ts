import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { GetAllLogsAuthenticatedUserUsecase } from './../../../application/use-cases/access-log/get-all-logs-authenticated -user.usecase';
import { Controller, Get, Req, Res, Body, UseGuards } from '@nestjs/common';
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
  async index(
    @User() user,
    @Req() req: Request,
    @Body() body,
    @Res() res: Response,
  ) {
    console.log(req, user);
    const data = await this.getAllLogsAuthenticatedUser.execute(user._id);
    return res.status(200).json(data);
  }
}
