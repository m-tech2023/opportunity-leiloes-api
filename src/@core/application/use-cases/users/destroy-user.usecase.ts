import { UserService } from '../../services/users/user.service';
import mongoose from 'mongoose';

export class DestroyUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(id: string) {
    return await this.userService.deleteById(id);
  }
}
