import { User } from 'src/@core/domain/entities/users/user.entity';
import { CreateUserDto } from '../../dto/requests/users/create-user.dto';
import { UserService } from '../../services/users/user.service';

export class CreateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto as any).getUser();
    return await this.userService.create(user);
  }
}
