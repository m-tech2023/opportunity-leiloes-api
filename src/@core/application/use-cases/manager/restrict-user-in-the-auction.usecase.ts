import { User } from '@prisma/client';
import { UpdateUserDto } from '../../dto/requests/users/update-user.dto';
import { ManagerService } from '../../services/manager/manager.service';

export class RestrictUserInTheAuctionUsecase {
  constructor(private readonly managerService: ManagerService) {}

  async execute(userId: string, user: User) {
    const restrictedForAuction = user.restrictedForAuction ? false : true;

    return await this.managerService.restrictUserInTheAuction(userId, {
      restrictedForAuction,
    });
  }
}
