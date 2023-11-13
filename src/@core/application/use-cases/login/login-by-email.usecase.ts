import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { comparePassword } from 'src/@core/infra/utils/password-hash/password-hash.util';
import { UserLoginDto } from '../../dto/requests/auth/user-login.dto';
import { AccessTokenResponseDto } from '../../dto/responses/jwt/access-token-response.dto';
import { UserResponseDto } from '../../dto/responses/users/user.dto';
import { UserService } from '../../services/users/user.service';

export class LoginByEmailUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(userLoginDto: UserLoginDto): Promise<AccessTokenResponseDto> {
    const user = await this.userService.findByEmail(userLoginDto.username);
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

    user.password = null;
    user.document = null;
    return this.getAccessToken(user);
  }

  private getAccessToken(user: UserResponseDto): AccessTokenResponseDto {
    return {
      access_token: this.jwtService.sign({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        roleId: user.roleId,
        confirmedAt: user.confirmedAt,
      }),
      expires_in: env.JWT_EXPIRES_IN,
    };
  }
}
