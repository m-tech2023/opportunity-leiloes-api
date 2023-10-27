import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { Request } from 'express';
import { UserLoginDto } from 'src/@core/application/dto/requests/auth/user-login.dto';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';
// import { AuthenticationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authentication/authentication.guard';
// import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { AuthenticationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.loginUseCase.execute({
      username: userLoginDto.username,
      password: userLoginDto.password,
    });
  }

  @UseGuards(AuthorizationGuard)
  @Get('user')
  async getAuthUser(@Req() req: Request) {
    return req.user;
  }
}
