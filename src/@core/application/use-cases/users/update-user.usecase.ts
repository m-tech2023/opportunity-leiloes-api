import { User } from 'src/@core/domain/entities/users/user.entity';
import { UpdateUserDto } from '../../dto/requests/users/update-user.dto';
import { UserService } from '../../services/users/user.service';

export class UpdateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(id: string, updateUserDto: UpdateUserDto) {
    const user = User.create(updateUserDto as any).getUser();
    return await this.userService.update(id, user);
  }
}
