import { cnpj, cpf } from 'cpf-cnpj-validator';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { onlyNumbers } from 'src/@core/infra/utils/regex/clean-numeric-str';
import { CreateUserDto } from '../../dto/requests/users/create-user.dto';
import { UserService } from '../../services/users/user.service';

export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto as any).getUser();

    const findUserByEmail = await this.userService.findByEmail(user.email);
    if (findUserByEmail) {
      throw new Error('User already registered with this e-mail address.');
    }

    const validDocument =
      cpf.isValid(createUserDto.document) ||
      cnpj.isValid(createUserDto.document);
    let data = {
      document: user.document,
    };

    if (validDocument) {
      data = {
        document: onlyNumbers(user.document),
      };
    }

    const findUserByDocument = await this.userService.findByDocument(data);
    if (findUserByDocument) {
      throw new Error('User already registered with this document.');
    }

    return await this.userService.create(user);
  }
}
