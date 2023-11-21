import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from 'src/@core/application/services/users/user.service';
import { CreateUserUseCase } from 'src/@core/application/use-cases/users/create-user.usecase';
import { DestroyUserUseCase } from 'src/@core/application/use-cases/users/destroy-user.usecase';
import { FindByEmailUseCase } from 'src/@core/application/use-cases/users/find-by-email.usecase';
import { FindByIdUseCase } from 'src/@core/application/use-cases/users/find-by-id.usecase';
import { GetAllUseCase } from 'src/@core/application/use-cases/users/get-all.usecase';
import { UpdateUserUseCase } from 'src/@core/application/use-cases/users/update-user.usecase';
import { EmailAlreadyUsedRule } from 'src/@core/infra/validations/rules/email-already-used';
import { UsersController } from 'src/@core/presentation/controllers/users/users.controller';
import { FindUserMiddleware } from './middlewares/find-user/find-user.middleware';
import { UserRepository } from 'src/@core/infra/databases/prisma/repositories/users/user.repository';
import { PrismaService } from 'src/@core/infra/databases/prisma/prisma.service';
import { PersonalDataRepository } from 'src/@core/infra/databases/prisma/repositories/account/personal-data.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    PrismaService,
    FindUserMiddleware,
    PersonalDataRepository,
    UserRepository,
    {
      provide: GetAllUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new GetAllUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: CreateUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new CreateUserUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UpdateUserUseCase(new UserService(userRepository));
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
    {
      provide: FindByEmailUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new FindByEmailUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },
    {
      provide: DestroyUserUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new DestroyUserUseCase(new UserService(userRepository));
      },
      inject: [UserRepository],
    },

    EmailAlreadyUsedRule,
  ],
  exports: [
    GetAllUseCase,
    FindByEmailUseCase,
    FindByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DestroyUserUseCase,
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FindUserMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.GET })
      .apply(FindUserMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.PUT })
      .apply(FindUserMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.DELETE });
  }
}
