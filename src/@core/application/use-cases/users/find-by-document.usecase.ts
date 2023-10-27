import { UserService } from '../../services/users/user.service';
import { Document } from '../login/types/document.type';

export class FindByDocumentUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(document: Document) {
    return await this.userService.findByDocument(document);
  }
}
