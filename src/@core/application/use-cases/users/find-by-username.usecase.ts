import { UserService } from '../../services/users/user.service';

export class FindByUsernameUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(username: string) {
    return (
      (await this.userService.findByEmail(username)) ??
      (await this.userService.findByDocument({ document: username }))
    );
  }
}
