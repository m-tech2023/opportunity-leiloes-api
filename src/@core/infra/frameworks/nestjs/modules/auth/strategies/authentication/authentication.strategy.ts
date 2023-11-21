import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserLoginDto } from 'src/@core/application/dto/requests/auth/user-login.dto';
import { LoginUseCase } from 'src/@core/application/use-cases/login/login.usecase';

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy) {
  constructor(private loginUseCase: LoginUseCase) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    // validar essa parte
    const user = await this.loginUseCase.execute({
      username,
      password,
    } as UserLoginDto);

    if (!user) {
      throw new UnauthorizedException('Incorrect email address or password');
    }

    return user;
  }
}
