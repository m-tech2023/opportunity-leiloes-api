import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserLoginDto } from 'src/@core/application/dto/requests/auth/user-login.dto';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';
import { AuthenticationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { User } from 'src/@core/infra/frameworks/nestjs/modules/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Req() req: Request,
    @Headers() headers: Headers,
  ) {
    const login = this.loginUseCase.execute({
      username: userLoginDto.username, 
      password: userLoginDto.password
    });
    
    // const accessLogProps: AccessLogProps = {
    //   userId: (req.user as any).id,
    //   ip: req.ip,
    //   geolocalization: 'A DEFINIR',
    //   accessedAt: new Date(),
    //   browser: headers['user-agent'],
    // };

    return login;
  }

  @UseGuards(AuthorizationGuard)
  @Get('user')
  async getAuthUser(@User() user) {
    return user;
  }
}
