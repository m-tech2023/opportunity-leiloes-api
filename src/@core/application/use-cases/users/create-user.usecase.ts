import { cnpj, cpf } from 'cpf-cnpj-validator';
import { User } from 'src/@core/domain/entities/users/user.entity';
import { CreateUserDto } from '../../dto/requests/users/create-user.dto';
import { UserService } from '../../services/users/user.service';
import { HttpException } from '@nestjs/common';

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

    if (!validDocument) {
      throw new HttpException('Document invalid', 400);
    }

    const findUserByDocument = await this.userService.findByDocument(
      createUserDto.document,
    );
    if (findUserByDocument) {
      throw new Error('User already registered with this document.');
    }

    return await this.userService.create(user);
  }
}
