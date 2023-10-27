import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserLoginDto } from 'src/@core/application/dto/requests/auth/user-login.dto';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';
// import { AuthenticationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authentication/authentication.guard';
// import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { AuthenticationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authentication/authentication.guard';
import { AuthorizationGuard } from 'src/@core/infra/frameworks/nestjs/modules/auth/guards/authorization/authorization.guard';
import { User } from 'src/@core/infra/frameworks/nestjs/modules/users/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
  ) {}
  
  @Post('login')
  @ApiTags('Auth')
  @HttpCode(200)
  @UseGuards(AuthenticationGuard)
  @ApiBody({ type: UserLoginDto })
  @ApiOperation({ summary: 'Login by E-mail, CNPJ, CPF or PASSPORT number.' })
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

  @Get('user')
  @UseGuards(AuthorizationGuard)
  @ApiOperation({ summary: 'Get the authenticated user.' })
  @ApiTags('Auth')
  @ApiBearerAuth()
  async getAuthUser(@User() user) {
    return user;
  }
}
