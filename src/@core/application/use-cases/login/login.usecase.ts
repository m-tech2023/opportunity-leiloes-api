import { cnpj, cpf } from 'cpf-cnpj-validator';
import * as emailValidator from 'email-validator';
import { UserLoginDto } from '../../dto/requests/auth/user-login.dto';
import { AccessTokenResponseDto } from '../../dto/responses/jwt/access-token-response.dto';
import { LoginByDocumentUseCase } from './login-by-document.usecase';
import { LoginByEmailUseCase } from './login-by-email.usecase';

export class LoginUseCase {
  constructor(
    private readonly loginByEmailUseCase: LoginByEmailUseCase,
    private readonly loginByDocumentUseCase: LoginByDocumentUseCase,
  ) {}

  async execute(userLoginDto: UserLoginDto): Promise<AccessTokenResponseDto> {
    const data = {
      username: userLoginDto.username,
      password: userLoginDto.password,
    } as UserLoginDto;

    const validEmail = emailValidator.validate(data.username);
    if (validEmail) {
      return await this.loginByEmailUseCase.execute(data);
    }

    const validDocument =
      cpf.isValid(data.username) || cnpj.isValid(data.username);
    if (validDocument) {
      return await this.loginByDocumentUseCase.execute(data);
    }

    // passaporte
    return await this.loginByDocumentUseCase.execute(data);
  }
}
