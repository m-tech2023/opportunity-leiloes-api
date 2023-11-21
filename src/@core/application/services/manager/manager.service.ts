import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../dto/requests/users/update-user.dto';

@Injectable()
export class ManagerService {
  constructor(private readonly userRepository: UserRepository) {}

  async restrictUserInTheAuction(userId: string, updatedData: UpdateUserDto) {
    return await this.userRepository.restrictedForAuction(userId, updatedData);
  }
  async changeUserStatusToRegistered(
    userId: string,
    updateData: UpdateUserDto,
  ) {
    return await this.userRepository.changeUserStatusToRegistered(
      userId,
      updateData,
    );
  }
}
