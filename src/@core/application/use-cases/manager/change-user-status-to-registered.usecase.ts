import { User } from '@prisma/client';
import { ManagerService } from '../../services/manager/manager.service';

export class ChangeUserStatusToRegisteredUseCase {
  constructor(private readonly managerService: ManagerService) {}

  async execute(userId: string, user: User) {
    const isPreRegistration = user.isPreRegistration ? false : true;

    return await this.managerService.changeUserStatusToRegistered(userId, {
      isPreRegistration,
    });
  }
}
