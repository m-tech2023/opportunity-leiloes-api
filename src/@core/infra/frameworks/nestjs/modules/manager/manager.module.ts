import { Module } from '@nestjs/common';
import { ManagerController } from 'src/@core/presentation/controllers/manager/manager.controller';
import { ManagerService } from 'src/@core/application/services/manager/manager.service';
import { RestrictUserInTheAuctionUsecase } from 'src/@core/application/use-cases/manager/restrict-user-in-the-auction.usecase';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';
import { UserService } from 'src/@core/application/services/users/user.service';
import { PrismaService } from 'src/@core/infra/databases/prisma/prisma.service';
import { ChangeUserStatusToRegisteredUseCase } from 'src/@core/application/use-cases/manager/change-user-status-to-registered.usecase';

@Module({
  imports: [],
  controllers: [ManagerController],

  providers: [
    PrismaService,
    UserRepository,
    {
      provide: RestrictUserInTheAuctionUsecase,
      useFactory: (userRepository: UserRepository) => {
        return new RestrictUserInTheAuctionUsecase(
          new ManagerService(userRepository),
        );
      },
      inject: [UserRepository],
    },
    {
      provide: ChangeUserStatusToRegisteredUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new ChangeUserStatusToRegisteredUseCase(
          new ManagerService(userRepository),
        );
      },
      inject: [UserRepository],
    },
    {
      provide: FindByIdUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new FindByIdUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
  ],
})
export class ManagerModule {}
