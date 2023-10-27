import { AccessLogProps } from './../../../domain/entities/access-log/access-log.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { Request } from 'express';
import { UserLoginDto } from 'src/@core/application/dto/requests/auth/user-login.dto';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';
import { User } from 'src/@core/domain/entities/users/user.entity';
// import { AuthenticationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authentication/authentication.guard';
// import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  //   @UseGuards(AuthenticationGuard)
  @Post('login')
  async login(
    @Body() body: UserLoginDto,
    @Req() req: Request,
    @Headers() headers: Headers,
  ) {
    const login = this.loginUseCase.execute(body.email, body.password);
    const accessLogProps: AccessLogProps = {
      userId: '',
      ip: req.ip,
      geolocalization: 'A DEFINIR',
      accessedAt: new Date(),
      browser: headers['user-agent'],
    };
    console.log(accessLogProps);
    return login;
  }

  //   @UseGuards(AuthorizationGuard)
  @Get('user')
  async getAuthUser(@Req() req: Request) {
    return req.user;
  }
}
