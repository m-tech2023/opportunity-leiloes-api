import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { comparePassword } from 'src/@core/infra/utils/password-hash/password-hash.util';
import { onlyNumbers } from 'src/@core/infra/utils/regex/clean-numeric-str';
import { UserLoginDto } from '../../dto/requests/auth/user-login.dto';
import { AccessTokenResponseDto } from '../../dto/responses/jwt/access-token-response.dto';
import { UserResponseDto } from '../../dto/responses/users/user.dto';
import { UserService } from '../../services/users/user.service';

export class LoginByDocumentUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(userLoginDto: UserLoginDto): Promise<any> {
    const username = onlyNumbers(userLoginDto.username);

    const user = await this.userService.findByDocument(username);

    if (!user) {
      return null;
    }

    const validatedPassword = comparePassword(
      userLoginDto.password,
      user.password,
    );
    if (!validatedPassword) {
      return null;
    }

    delete user.password;

    return this.getAccessToken(user);
  }

  private getAccessToken(user: UserResponseDto): AccessTokenResponseDto {
    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      roleName: user.roleName,
      confirmedAt: user.confirmedAt,
    };

    return {
      access_token: this.jwtService.sign(user),
      expires_in: env.JWT_EXPIRES_IN,
    };
  }
}
