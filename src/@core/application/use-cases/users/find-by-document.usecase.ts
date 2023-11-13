import { UserService } from '../../services/users/user.service';

export class FindByDocumentUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(document: string) {
    return await this.userService.findByDocument(document);
  }
}
